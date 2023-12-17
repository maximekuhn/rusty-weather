use crate::app_state::AppState;
use crate::handlers::error::HandlerError;
use crate::handlers::HandlerResult;
use crate::settings::error::SettingsError;
use crate::settings::model::AppSettings;
use crate::settings::SettingsRepository;
use crate::weather::WeatherClient;
use axum::extract::State;
use axum::Json;
use log::error;

pub async fn get_settings<W: WeatherClient, SR: SettingsRepository>(
    State(app_state): State<AppState<W, SR>>,
) -> HandlerResult<Json<AppSettings>> {
    let current_settings = app_state.settings_repo.get_current().await?;
    Ok(Json(current_settings))
}

impl From<SettingsError> for HandlerError {
    fn from(settings_error: SettingsError) -> Self {
        error!("SettingsError: {}", &settings_error.to_string());
        Self::default()
    }
}
