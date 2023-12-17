use crate::settings::SettingsRepository;
use std::sync::Arc;

use crate::weather::WeatherClient;

#[derive(Clone)]
pub struct AppState<W, SR>
where
    W: WeatherClient,
    SR: SettingsRepository,
{
    pub weather_client: Arc<W>,
    pub settings_repo: Arc<SR>,
}

impl<W, SR> AppState<W, SR>
where
    W: WeatherClient,
    SR: SettingsRepository,
{
    pub fn new(weather_client: W, settings_repo: SR) -> Self {
        Self {
            weather_client: Arc::new(weather_client),
            settings_repo: Arc::new(settings_repo),
        }
    }
}
