use crate::app_state::AppState;
use crate::config::Config;
use crate::weather::open_weather_api::OpenWeatherAPI;

use axum::routing::get;
use axum::{serve, Router};
use tokio::net::TcpListener;
use tower_http::cors::CorsLayer;

mod app_state;
mod config;
mod handlers;
mod weather;

#[tokio::main]
async fn main() {
    // Create application state
    let app_state = create_app_state().unwrap();

    // create application router
    let router = Router::new()
        .route(
            "/api/weather/current",
            get(handlers::weather::get_current_weather),
        )
        .with_state(app_state)
        .fallback(handlers::_404_not_found)
        .layer(CorsLayer::permissive());

    // Serve the application on port 9999
    let listener = TcpListener::bind("0.0.0.0:9999").await.unwrap();
    serve(listener, router).await.unwrap();
}

fn create_app_state() -> Result<AppState<OpenWeatherAPI>, &'static str> {
    let config = Config::new()?;
    let weather_client = OpenWeatherAPI::new(config.open_weather_api_key);
    let app_state = AppState::new(weather_client);
    Ok(app_state)
}
