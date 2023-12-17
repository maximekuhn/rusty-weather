use serde::Serialize;
use sqlx::FromRow;

#[derive(Serialize, FromRow)]
pub struct AppSettings {
    pub current_city: String,
}
