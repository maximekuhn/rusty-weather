use axum::handler::Handler;
use axum::routing::{get, post};
use axum::{middleware, serve, Router};
use env_logger::Env;
use log::{error, info};
use sqlx::migrate::{Migration, Migrator};
use sqlx::SqlitePool;
use std::env::current_dir;
use std::path::Path;
use std::process::exit;
use tokio::net::TcpListener;
use tower_http::cors::CorsLayer;

use crate::app_state::AppState;
use crate::config::Config;
use crate::settings::sqlite_repository::SQLiteSettingsRepository;
use crate::weather::open_weather_api::OpenWeatherAPI;

mod app_state;
mod config;
mod handlers;
mod language;
mod middlewares;
mod settings;
mod weather;

#[tokio::main]
async fn main() {
    // Init logger
    init_logger();

    // Create application state
    let app_state = match create_app_state().await {
        Ok(state) => state,
        Err(e) => {
            error!("Failed to create app state: '{}'", e);
            exit(1);
        }
    };

    // create application router
    let weather_routes = create_weather_routes(app_state.clone());
    let settings_routes = create_settings_routes(app_state);
    let router = Router::new()
        .nest("/api/weather", weather_routes)
        .nest("/api/settings", settings_routes)
        .route_layer(middleware::from_fn(middlewares::logger_mw))
        .fallback(handlers::_404_not_found)
        .layer(CorsLayer::permissive());

    // Serve the application on port 9999
    let listener = TcpListener::bind("0.0.0.0:9999").await.unwrap();
    serve(listener, router).await.unwrap();
}

fn create_weather_routes(app_state: AppState<OpenWeatherAPI, SQLiteSettingsRepository>) -> Router {
    Router::new()
        .route(
            "/current/:city_name/:language",
            get(handlers::weather::get_current_weather),
        )
        .with_state(app_state)
}

fn create_settings_routes(app_state: AppState<OpenWeatherAPI, SQLiteSettingsRepository>) -> Router {
    Router::new()
        .route("/current", get(handlers::settings::get_settings))
        .route("/update", post(handlers::settings::update_settings))
        .with_state(app_state)
}

async fn create_app_state() -> Result<AppState<OpenWeatherAPI, SQLiteSettingsRepository>, String> {
    // Get config
    let config = Config::new().map_err(|err| err.to_string())?;

    // Create weather client
    let weather_client = OpenWeatherAPI::new(config.open_weather_api_key);

    // Connect to db and run migration(s) if required
    let db_pool = SqlitePool::connect(&config.db_url)
        .await
        .map_err(|err| format!("Failed to connect to sqlite db: '{}'", err))?;
    let migrator = Migrator::new(Path::new(&config.db_migrations_path))
        .await
        .map_err(|err| format!("Failed to create db migrator: '{}'", err))?;
    migrator
        .run(&db_pool)
        .await
        .map_err(|err| format!("Failed to run db migration: '{}'", err))?;

    // Create repositories
    let settings_repository = SQLiteSettingsRepository::new(db_pool);

    let app_state = AppState::new(weather_client, settings_repository);
    Ok(app_state)
}

fn init_logger() {
    let env = Env::default().filter_or("RUSTY_WEATHER_RUST_LOG", "rusty_weather=error,info");
    env_logger::init_from_env(env);
    info!("Logger initialized !");
}
