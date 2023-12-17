use axum::handler::Handler;
use axum::routing::get;
use axum::{middleware, serve, Router};
use env_logger::Env;
use log::{error, info};
use sqlx::SqlitePool;
use std::process::exit;
use tokio::net::TcpListener;
use tower_http::cors::CorsLayer;

use crate::app_state::AppState;
use crate::config::Config;
use crate::settings::SQLiteSettingsRepository;
use crate::weather::open_weather_api::OpenWeatherAPI;

mod app_state;
mod config;
mod handlers;
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
    let weather_routes = create_weather_routes(app_state);
    let router = Router::new()
        .nest("/api/weather", weather_routes)
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
            "/current/:city_name",
            get(handlers::weather::get_current_weather),
        )
        .with_state(app_state)
}

fn create_settings_routes(app_state: AppState<OpenWeatherAPI, SQLiteSettingsRepository>) -> Router {
    todo!()
}

async fn create_app_state() -> Result<AppState<OpenWeatherAPI, SQLiteSettingsRepository>, String> {
    let config = Config::new().map_err(|err| err.to_string())?;

    let weather_client = OpenWeatherAPI::new(config.open_weather_api_key);

    let db_pool = SqlitePool::connect(&config.db_url)
        .await
        .map_err(|err| format!("Failed to connect to sqlite db: '{}'", err))?;
    let settings_repository = SQLiteSettingsRepository::new(db_pool);

    let app_state = AppState::new(weather_client, settings_repository);
    Ok(app_state)
}

fn init_logger() {
    let env = Env::default().filter_or("RUSTY_WEATHER_RUST_LOG", "rusty_weather=error,info");
    env_logger::init_from_env(env);
    info!("Logger initialized !");
}
