use crate::handlers::error::HandlerError;
use axum::http::StatusCode;

pub mod error;
pub mod weather;

type HandlerResult<T> = Result<T, HandlerError>;

pub async fn _404_not_found() -> (StatusCode, &'static str) {
    (StatusCode::NOT_FOUND, "Requested resource does not exist")
}
