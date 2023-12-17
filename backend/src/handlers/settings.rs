use crate::app_state::AppState;
use crate::handlers::error::HandlerError;
use crate::handlers::HandlerResult;
use crate::settings::error::SettingsError;
use crate::settings::model::AppSettings;
use crate::settings::SettingsRepository;
use crate::weather::WeatherClient;
use axum::extract::State;
use axum::http::StatusCode;
use axum::Json;
use log::error;
use serde::Deserialize;

pub async fn get_settings<W: WeatherClient, SR: SettingsRepository>(
    State(app_state): State<AppState<W, SR>>,
) -> HandlerResult<Json<AppSettings>> {
    let current_settings = app_state.settings_repo.get_current().await?;
    Ok(Json(current_settings))
}

pub async fn update_settings<W: WeatherClient, SR: SettingsRepository>(
    State(app_state): State<AppState<W, SR>>,
    Json(new_settings): Json<UpdateSettings>,
) -> HandlerResult<StatusCode> {
    app_state
        .settings_repo
        .update(AppSettings::from(new_settings))
        .await?;
    Ok(StatusCode::OK)
}

impl From<SettingsError> for HandlerError {
    fn from(settings_error: SettingsError) -> Self {
        error!("SettingsError: {}", &settings_error.to_string());
        Self::default()
    }
}

#[derive(Deserialize)]
pub struct UpdateSettings {
    new_current_city: String,
}

impl From<UpdateSettings> for AppSettings {
    fn from(update_settings: UpdateSettings) -> Self {
        Self {
            current_city: update_settings.new_current_city,
        }
    }
}
