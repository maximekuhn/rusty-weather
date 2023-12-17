use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::Json;
use log::{debug, error};

use crate::app_state::AppState;
use crate::handlers::error::HandlerError;
use crate::handlers::HandlerResult;
use crate::settings::SettingsRepository;
use crate::weather::error::WeatherError;
use crate::weather::model::CurrentDayWeather;
use crate::weather::WeatherClient;

pub async fn get_current_weather<W: WeatherClient, SR: SettingsRepository>(
    Path(city_name): Path<String>,
    State(app_state): State<AppState<W, SR>>,
) -> HandlerResult<Json<CurrentDayWeather>> {
    let current_weather = app_state
        .weather_client
        .get_current_weather(&city_name)
        .await?;
    Ok(Json(current_weather))
}

impl From<WeatherError> for HandlerError {
    fn from(weather_error: WeatherError) -> Self {
        error!("WeatherError: {}", &weather_error.to_string());
        match weather_error {
            WeatherError::FailedToFetchOpenWeather(_) => {
                Self::new(StatusCode::INTERNAL_SERVER_ERROR, None)
            }
            WeatherError::CityNotFound => {
                Self::new(StatusCode::BAD_REQUEST, Some("City not found".to_string()))
            }
        }
    }
}
