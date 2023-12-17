use serde::Serialize;

#[derive(Serialize)]
pub struct AppSettings {
    pub current_city: String,
}
