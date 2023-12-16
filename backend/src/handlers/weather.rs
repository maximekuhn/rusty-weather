use axum::extract::{Path, State};
use axum::Json;

use crate::app_state::AppState;
use crate::weather::error::WeatherError;
use crate::weather::model::CurrentDayWeather;
use crate::weather::WeatherClient;

pub async fn get_current_weather<W: WeatherClient>(
    Path(city_name): Path<String>,
    State(app_state): State<AppState<W>>,
) -> Result<Json<CurrentDayWeather>, WeatherError> {
    let current_weather = app_state
        .weather_client
        .get_current_weather(&city_name)
        .await?;
    Ok(Json(current_weather))
}
