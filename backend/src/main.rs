use axum::routing::get;
use axum::{serve, Json, Router};
use tokio::net::TcpListener;
use tower_http::cors::CorsLayer;

async fn get_current_temperature() -> Json<f32> {
    Json(30.0)
}

#[tokio::main]
async fn main() {
    let router = Router::new()
        .route("/hello", get(|| async { "hello" }))
        .route("/current", get(get_current_temperature))
        .layer(CorsLayer::permissive());
    let listener = TcpListener::bind("0.0.0.0:9999").await.unwrap();
    serve(listener, router).await.unwrap();
}
