use axum::routing::get;
use axum::{serve, Router};
use tokio::net::TcpListener;

#[tokio::main]
async fn main() {
    let router = Router::new().route("/hello", get(|| async { "hello" }));
    let listener = TcpListener::bind("0.0.0.0:3000").await.unwrap();
    serve(listener, router).await.unwrap();
}
