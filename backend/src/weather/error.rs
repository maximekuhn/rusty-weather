use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use std::error::Error;
use std::fmt::{Debug, Display, Formatter};
use std::sync::Arc;

#[derive(Debug)]
pub enum WeatherError {
    FailedToFetchOpenWeather,
    CityNotFound,
}

impl Display for WeatherError {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        write!(f, "{:?}", self)
    }
}

impl Error for WeatherError {}

impl IntoResponse for WeatherError {
    fn into_response(self) -> Response {
        if let Self::CityNotFound = self {
            let mut response = StatusCode::BAD_REQUEST.into_response();
            response.extensions_mut().insert(Arc::new(self));
            return response;
        }
        dbg!(&self);
        StatusCode::INTERNAL_SERVER_ERROR.into_response()
    }
}
