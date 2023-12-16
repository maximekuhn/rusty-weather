use crate::weather::error::WeatherError;
use axum::async_trait;
use serde::Deserialize;
use std::collections::HashMap;
use std::sync::Arc;
use tokio::sync::Mutex;

use crate::weather::model::{CurrentDayWeather, ForecastWeather, OpenWeatherAPICurrent};
use crate::weather::WeatherClient;

#[derive(Clone)]
pub struct OpenWeatherAPI {
    #[allow(non_snake_case)]
    API_KEY: String,
    cities_coords_cache: Arc<Mutex<HashMap<String, Coords>>>,
}

#[derive(Clone, Deserialize)]
struct Coords {
    lat: f32,
    lon: f32,
}

impl OpenWeatherAPI {
    pub fn new(api_key: String) -> Self {
        Self {
            API_KEY: api_key,
            cities_coords_cache: Arc::new(Mutex::new(HashMap::new())),
        }
    }

    async fn get_or_request_city_coords(&self, city_name: &str) -> Result<Coords, WeatherError> {
        if let Some(coords) = self.cities_coords_cache.lock().await.get(city_name) {
            return Ok(coords.clone());
        }

        let maybe_coords = get_city_coords(city_name, &self.API_KEY).await?;
        match maybe_coords {
            None => Err(WeatherError::CityNotFound),
            Some(coords) => {
                self.cities_coords_cache
                    .lock()
                    .await
                    .insert(city_name.to_string(), coords.clone());
                Ok(coords)
            }
        }
    }
}

#[async_trait]
impl WeatherClient for OpenWeatherAPI {
    async fn get_current_weather(
        &self,
        city_name: &str,
    ) -> Result<CurrentDayWeather, WeatherError> {
        let coords = self.get_or_request_city_coords(city_name).await?;
        let current_day_weather = get_current_weather(&coords, &self.API_KEY).await?;
        Ok(current_day_weather)
    }

    async fn get_forecast_weather(&self, city_name: &str) -> Result<ForecastWeather, WeatherError> {
        todo!()
    }
}

// https://openweathermap.org/api/geocoding-api
async fn get_city_coords(city_name: &str, api_key: &str) -> Result<Option<Coords>, WeatherError> {
    let url = format!(
        "https://api.openweathermap.org/geo/1.0/direct?q={}&appid={}",
        city_name, api_key
    );
    let response: Vec<Coords> = reqwest::get(url)
        .await
        .map_err(|_| WeatherError::FailedToFetchOpenWeather)?
        .json()
        .await
        .map_err(|_| WeatherError::FailedToFetchOpenWeather)?;
    Ok(response.first().cloned())
}

// https://openweathermap.org/current
async fn get_current_weather(
    coords: &Coords,
    api_key: &str,
) -> Result<CurrentDayWeather, WeatherError> {
    let url = format!(
        "https://api.openweathermap.org/data/2.5/weather?lat={}&lon={}&appid={}&units=metric",
        coords.lat, coords.lon, api_key
    );
    let current_weather: OpenWeatherAPICurrent = reqwest::get(url)
        .await
        .map_err(|_| WeatherError::FailedToFetchOpenWeather)?
        .json()
        .await
        .map_err(|_| WeatherError::FailedToFetchOpenWeather)?;

    Ok(CurrentDayWeather::from(current_weather))
}
