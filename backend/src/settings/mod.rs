use std::ops::Deref;

use axum::async_trait;

use crate::settings::error::SettingsError;
use crate::settings::model::AppSettings;

pub mod error;
pub mod model;
pub mod sqlite_repository;

#[async_trait]
pub trait SettingsRepository {
    async fn save(&self, settings: AppSettings) -> Result<(), SettingsError>;
    async fn get_current(&self) -> Result<AppSettings, SettingsError>;
    async fn update(&self, new_settings: AppSettings) -> Result<(), SettingsError>;
}
