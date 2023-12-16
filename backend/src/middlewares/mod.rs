use axum::extract::Request;
use axum::middleware::Next;
use axum::response::Response;
use std::time::Instant;

pub async fn logger_mw(req: Request, next: Next) -> Response {
    let method_and_path = { format!("{:<5} {:<80}", req.method().as_str(), req.uri().path()) };
    let now = Instant::now();
    let response = next.run(req).await;
    let elapsed_ms = now.elapsed().as_millis();
    match response.status().as_str().starts_with('2') {
        true => println!("{} [{} ms] SUCCESS", method_and_path, elapsed_ms),
        false => println!(
            "{} [{} ms] ERROR ({})",
            method_and_path,
            elapsed_ms,
            response.status().as_str()
        ),
    }
    response
}
