use crate::weather::WeatherClient;
use std::sync::Arc;

#[derive(Clone)]
pub struct AppState<W>
where
    W: WeatherClient,
{
    pub weather_client: Arc<W>,
}

impl<W> AppState<W>
where
    W: WeatherClient,
{
    pub fn new(weather_client: W) -> Self {
        Self {
            weather_client: Arc::new(weather_client),
        }
    }
}
