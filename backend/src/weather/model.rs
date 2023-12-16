use serde::{Deserialize, Serialize};
#[derive(Serialize)]
pub struct CurrentDayWeather {
    pub temperature: f32,
    pub feels_like: f32,
    pub pressure: f32,
    pub humidity_rate: f32,
    pub wind_speed: f32,
    pub visibility: f32,
    pub probability_of_precipitation: f32,
    pub sunset: i64,
    pub sunrise: i64,
    pub description: String,
}

#[derive(Serialize)]
pub struct ForecastWeather {
    pub highest_temperature: f32,
    pub lowest_temperature: f32,
    pub probability_of_precipitation: f32,
}

#[derive(Deserialize)]
pub struct OpenWeatherAPICurrent {
    weather: Vec<OpenWeatherAPICurrentWeather>,
}

#[derive(Deserialize)]
pub struct OpenWeatherAPICurrentWeather {}

impl From<OpenWeatherAPICurrent> for CurrentDayWeather {
    fn from(current_weather: OpenWeatherAPICurrent) -> Self {
        Self {
            temperature: 0.0,
            feels_like: 0.0,
            pressure: 0.0,
            humidity_rate: 0.0,
            wind_speed: 0.0,
            visibility: 0.0,
            probability_of_precipitation: 0.0,
            sunset: 0,
            sunrise: 0,
            description: "TODO".to_string(),
        }
    }
}
