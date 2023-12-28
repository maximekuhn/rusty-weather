use serde::Serialize;
use sqlx::FromRow;
use crate::language::Language;

#[derive(Serialize, FromRow)]
pub struct AppSettings {
    pub current_city: String,
    pub language: Language,
}
