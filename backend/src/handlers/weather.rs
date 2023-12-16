use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::Json;

use crate::app_state::AppState;
use crate::handlers::error::HandlerError;
use crate::handlers::HandlerResult;
use crate::weather::error::WeatherError;
use crate::weather::model::CurrentDayWeather;
use crate::weather::WeatherClient;

pub async fn get_current_weather<W: WeatherClient>(
    Path(city_name): Path<String>,
    State(app_state): State<AppState<W>>,
) -> HandlerResult<Json<CurrentDayWeather>> {
    let current_weather = app_state
        .weather_client
        .get_current_weather(&city_name)
        .await?;
    Ok(Json(current_weather))
}

impl From<WeatherError> for HandlerError {
    fn from(weather_error: WeatherError) -> Self {
        if let WeatherError::CityNotFound = weather_error {
            return Self::new(StatusCode::BAD_REQUEST, Some(weather_error.to_string()));
        }
        Self::default()
    }
}
