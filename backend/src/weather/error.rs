use std::error::Error;
use std::fmt::{Debug, Display, Formatter};

#[derive(Debug)]
pub enum WeatherError {
    CacheError,
    FailedToFetchOpenWeather,
    CityNotFound,
}

impl Display for WeatherError {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        write!(f, "{:?}", self)
    }
}

impl Error for WeatherError {}
