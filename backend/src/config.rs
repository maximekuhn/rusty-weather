use std::env;

pub struct Config {
    pub open_weather_api_key: String,
    pub db_url: String,
    pub db_migrations_path: String,
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
        let db_migrations_path =
            env::var("DB_MIGRATIONS_PATH").map_err(|_| "DB_MIGRATIONS_PATH not found")?;
        Ok(Self {
            open_weather_api_key,
            db_url,
            db_migrations_path,
        })
    }
}
