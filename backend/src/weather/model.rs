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
    main: OpenWeatherAPICurrentMain,
    wind: OpenWeatherAPICurrentWind,
    sys: OpenWeatherAPICurrentSys,
    visibility: f32,
}

#[derive(Deserialize)]
pub struct OpenWeatherAPICurrentWeather {
    description: String,
}

#[derive(Deserialize)]
pub struct OpenWeatherAPICurrentMain {
    temp: f32,
    feels_like: f32,
    pressure: f32,
    humidity: f32,
}

#[derive(Deserialize)]
pub struct OpenWeatherAPICurrentWind {
    speed: f32,
}

#[derive(Deserialize)]
pub struct OpenWeatherAPICurrentSys {
    sunset: i64,
    sunrise: i64,
}

impl From<OpenWeatherAPICurrent> for CurrentDayWeather {
    fn from(current_weather: OpenWeatherAPICurrent) -> Self {
        let description = match current_weather.weather.first() {
            None => "",
            Some(weather) => &weather.description,
        };

        Self {
            temperature: current_weather.main.temp,
            feels_like: current_weather.main.feels_like,
            pressure: current_weather.main.pressure,
            humidity_rate: current_weather.main.humidity,
            wind_speed: current_weather.wind.speed,
            visibility: current_weather.visibility,
            probability_of_precipitation: 0.0,
            sunset: current_weather.sys.sunset,
            sunrise: current_weather.sys.sunrise,
            description: description.to_string(),
        }
    }
}
