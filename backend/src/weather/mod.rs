use crate::weather::error::WeatherError;
use crate::weather::model::{CurrentDayWeather, ForecastWeather};
use axum::async_trait;

pub mod error;
pub mod model;
pub mod open_weather_api;

#[async_trait]
pub trait WeatherClient {
    async fn get_current_weather(&self, city_name: &str) -> Result<CurrentDayWeather, WeatherError>;

    async fn get_forecast_weather(&self, city_name: &str) -> Result<ForecastWeather, WeatherError>;
}
