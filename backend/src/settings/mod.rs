use crate::settings::error::SettingsError;
use crate::settings::model::AppSettings;
use axum::async_trait;
use sqlx::SqlitePool;

pub mod error;
pub mod model;

#[async_trait]
pub trait SettingsRepository {
    fn save(&self, settings: AppSettings) -> Result<(), SettingsError>;
    fn update(&self, new_settings: AppSettings) -> Result<(), SettingsError>;
}

pub struct SQLiteSettingsRepository {
    pool: SqlitePool,
}

impl SettingsRepository for SQLiteSettingsRepository {
    fn save(&self, settings: AppSettings) -> Result<(), SettingsError> {
        todo!()
    }

    fn update(&self, new_settings: AppSettings) -> Result<(), SettingsError> {
        todo!()
    }
}
