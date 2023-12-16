use crate::weather::error::WeatherError;
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use std::error::Error;
use std::fmt::{Display, Formatter};
use std::sync::Arc;

#[derive(Debug)]
pub struct HandlerError {
    status_code: StatusCode,
    message: Option<String>,
}

impl HandlerError {
    pub fn new(status_code: StatusCode, message: Option<String>) -> Self {
        Self {
            status_code,
            message,
        }
    }
}

impl Default for HandlerError {
    fn default() -> Self {
        Self {
            status_code: StatusCode::INTERNAL_SERVER_ERROR,
            message: None,
        }
    }
}

impl Display for HandlerError {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        write!(f, "{:?}", self)
    }
}

impl Error for HandlerError {}

impl IntoResponse for HandlerError {
    fn into_response(self) -> Response {
        let mut response = self.status_code.into_response();
        response.extensions_mut().insert(Arc::new(self));
        response
    }
}
