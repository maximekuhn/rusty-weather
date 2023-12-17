use crate::settings::error::SettingsError;
use crate::settings::model::AppSettings;
use axum::async_trait;
use sqlx::SqlitePool;

pub mod error;
pub mod model;

#[async_trait]
pub trait SettingsRepository {
    async fn save(&self, settings: AppSettings) -> Result<(), SettingsError>;
    async fn update(&self, new_settings: AppSettings) -> Result<(), SettingsError>;
}

pub struct SQLiteSettingsRepository {
    pool: SqlitePool,
}

#[async_trait]
impl SettingsRepository for SQLiteSettingsRepository {
    async fn save(&self, settings: AppSettings) -> Result<(), SettingsError> {
        todo!()
    }

    async fn update(&self, new_settings: AppSettings) -> Result<(), SettingsError> {
        todo!()
    }
}
