use axum::http::StatusCode;

pub mod weather;

pub async fn _404_not_found() -> (StatusCode, &'static str) {
    (StatusCode::NOT_FOUND, "Requested resource does not exist")
}
