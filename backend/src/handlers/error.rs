use std::error::Error;
use std::fmt::{Display, Formatter};
use std::sync::Arc;

use axum::http::header::CONTENT_TYPE;
use axum::http::{HeaderValue, StatusCode};
use axum::response::{IntoResponse, Response};
use serde::ser::SerializeStruct;
use serde::Serializer;

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
        let json_response = serde_json::to_string(&self.message.clone().unwrap_or_default())
            .expect("Failed to serialize a String");
        let mut response = json_response.into_response();
        response
            .headers_mut()
            .insert(CONTENT_TYPE, HeaderValue::from_static("application/json"));
        let status = response.status_mut();
        *status = self.status_code;
        response.extensions_mut().insert(Arc::new(self));
        response
    }
}
