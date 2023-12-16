use crate::app_state::AppState;
use crate::weather::model::CurrentDayWeather;
use crate::weather::WeatherClient;
use axum::extract::State;
use axum::Json;

pub async fn get_current_weather<W: WeatherClient>(
    State(app_state): State<AppState<W>>,
) -> Json<CurrentDayWeather>
where
    W: WeatherClient,
{
    todo!()
}
