use serde::Serialize;

#[derive(Serialize)]
pub struct AppSettings {
    current_city: String,
}
