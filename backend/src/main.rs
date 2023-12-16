use axum::handler::Handler;
use axum::routing::get;
use axum::{middleware, serve, Router};
use env_logger::Env;
use log::{error, info, warn};
use tokio::net::TcpListener;
use tower_http::cors::CorsLayer;

use crate::app_state::AppState;
use crate::config::Config;
use crate::weather::open_weather_api::OpenWeatherAPI;

mod app_state;
mod config;
mod handlers;
mod middlewares;
mod weather;

#[tokio::main]
async fn main() {
    // Init logger
    init_logger();

    // Create application state
    let app_state = create_app_state().unwrap();

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

fn create_weather_routes(app_state: AppState<OpenWeatherAPI>) -> Router {
    Router::new()
        .route(
            "/current/:city_name",
            get(handlers::weather::get_current_weather),
        )
        .with_state(app_state.clone())
}

fn create_app_state() -> Result<AppState<OpenWeatherAPI>, &'static str> {
    let config = Config::new()?;
    let weather_client = OpenWeatherAPI::new(config.open_weather_api_key);
    let app_state = AppState::new(weather_client);
    Ok(app_state)
}

fn init_logger() {
    let env = Env::default().filter_or("RUSTY_WEATHER_RUST_LOG", "rusty_weather=error,info");
    env_logger::init_from_env(env);
    info!("Logger initialized !");
}
