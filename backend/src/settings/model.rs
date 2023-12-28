use crate::language::Language;
use serde::ser::SerializeStruct;
use serde::{Serialize, Serializer};
use sqlx::FromRow;

#[derive(FromRow)]
pub struct AppSettings {
    pub current_city: String,
    pub language: Language,
}

impl Serialize for AppSettings {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let mut state = serializer.serialize_struct("AppSettings", 2)?;
        state.serialize_field("current_city", &self.current_city)?;
        state.serialize_field("language", &self.language.to_string())?;
        state.end()
    }
}
