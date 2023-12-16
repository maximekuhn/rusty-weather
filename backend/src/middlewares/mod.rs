use std::sync::Arc;
use std::time::Instant;

use axum::extract::Request;
use axum::middleware::Next;
use axum::response::Response;

use crate::handlers::error::HandlerError;

pub async fn logger_mw(req: Request, next: Next) -> Response {
    let method_and_path = { format!("{:<5} {:<40}", req.method().as_str(), req.uri().path()) };
    let now = Instant::now();
    let response = next.run(req).await;
    let elapsed_ms = now.elapsed().as_millis();
    match response.status().as_str().starts_with('2') {
        true => println!("{} [{} ms] SUCCESS", method_and_path, elapsed_ms),
        false => {
            let default_error = HandlerError::default();
            let error = match response.extensions().get::<Arc<HandlerError>>() {
                None => &default_error,
                Some(handler_error) => handler_error,
            };
            println!("{} [{} ms] ERROR ({})", method_and_path, elapsed_ms, error)
        }
    }
    response
}
