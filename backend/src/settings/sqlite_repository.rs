use crate::settings::error::SettingsError;
use crate::settings::model::AppSettings;
use crate::settings::SettingsRepository;
use axum::async_trait;
use sqlx::SqlitePool;

#[derive(Clone)]
pub struct SQLiteSettingsRepository {
    pool: SqlitePool,
    table_name: &'static str,
}

impl SQLiteSettingsRepository {
    pub fn new(pool: SqlitePool) -> Self {
        Self {
            pool,
            table_name: "app_settings",
        }
    }
}

#[async_trait]
impl SettingsRepository for SQLiteSettingsRepository {
    async fn save(&self, settings: AppSettings) -> Result<(), SettingsError> {
        todo!()
    }

    async fn get_current(&self) -> Result<AppSettings, SettingsError> {
        let query = format!("SELECT current_city, language FROM {}", self.table_name);
        let maybe_settings: Option<AppSettings> = sqlx::query_as(&query)
            .fetch_optional(&self.pool)
            .await
            .map_err(|err| SettingsError::SQLiteError(err.to_string()))?;
        match maybe_settings {
            None => Err(SettingsError::NoDefaultSettings),
            Some(settings) => Ok(settings),
        }
    }

    async fn update(&self, new_settings: AppSettings) -> Result<(), SettingsError> {
        let query = format!(
            "UPDATE {} SET current_city = ?, language = ?",
            self.table_name
        );
        let result = sqlx::query(&query)
            .bind(&new_settings.current_city)
            .bind(&new_settings.language)
            .execute(&self.pool)
            .await
            .map_err(|err| SettingsError::SQLiteError(err.to_string()))?;
        match result.rows_affected().eq(&1) {
            true => Ok(()),
            false => Err(SettingsError::SQLiteError(
                "Failed to update settings".to_string(),
            )),
        }
    }
}
