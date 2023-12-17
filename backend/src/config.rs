use std::env;

pub struct Config {
    pub open_weather_api_key: String,
    pub db_url: String,
}

impl Config {
    pub fn new() -> Result<Self, &'static str> {
        let open_weather_api_key = env::var("OPEN_WEATHER_API_KEY")
            .map_err(|_| "OPEN_WEATHER_API_KEY not found")?
            .trim()
            .to_string();
        let db_url = env::var("DB_URL")
            .map_err(|_| "DB_URL not found")?
            .trim()
            .to_string();
        Ok(Self {
            open_weather_api_key,
            db_url,
        })
    }
}
