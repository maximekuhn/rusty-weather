use crate::settings::error::SettingsError;
use crate::settings::model::AppSettings;
use axum::async_trait;
use sqlx::SqlitePool;

pub mod error;
pub mod model;

#[async_trait]
pub trait SettingsRepository {
    async fn save(&self, settings: AppSettings) -> Result<(), SettingsError>;
    async fn get_current(&self) -> Result<AppSettings, SettingsError>;
    async fn update(&self, new_settings: AppSettings) -> Result<(), SettingsError>;
}

#[derive(Clone)]
pub struct SQLiteSettingsRepository {
    pool: SqlitePool,
}

impl SQLiteSettingsRepository {
    pub fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }
}

#[async_trait]
impl SettingsRepository for SQLiteSettingsRepository {
    async fn save(&self, settings: AppSettings) -> Result<(), SettingsError> {
        todo!()
    }

    async fn get_current(&self) -> Result<AppSettings, SettingsError> {
        Ok(AppSettings {
            current_city: "Paris".to_string(),
        })
    }

    async fn update(&self, new_settings: AppSettings) -> Result<(), SettingsError> {
        todo!()
    }
}
