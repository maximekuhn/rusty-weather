use crate::language::Language;
use axum::async_trait;

use crate::weather::error::WeatherError;
use crate::weather::model::{CurrentDayWeather, ForecastWeather};

pub mod error;
pub mod model;
pub mod open_weather_api;

#[async_trait]
pub trait WeatherClient {
    async fn get_current_weather(
        &self,
        city_name: &str,
        language: Language,
    ) -> Result<CurrentDayWeather, WeatherError>;

    async fn get_forecast_weather(
        &self,
        city_name: &str,
        language: Language,
    ) -> Result<ForecastWeather, WeatherError>;
}
