use std::sync::Arc;

use crate::weather::WeatherClient;

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
