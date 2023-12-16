use std::env;

pub struct Config {
    pub open_weather_api_key: String,
}

impl Config {
    pub fn new() -> Result<Self, &'static str> {
        let open_weather_api_key =
            env::var("OPEN_WEATHER_API_KEY").map_err(|_| "OpenWeather API key not found")?;
        Ok(Self {
            open_weather_api_key,
        })
    }
}
