use axum::http::StatusCode;

use crate::handlers::error::HandlerError;

pub mod error;
pub mod weather;
pub mod settings;

type HandlerResult<T> = Result<T, HandlerError>;

pub async fn _404_not_found() -> (StatusCode, &'static str) {
    (StatusCode::NOT_FOUND, "Requested resource does not exist")
}
