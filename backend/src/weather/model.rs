use serde::Serialize;

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
