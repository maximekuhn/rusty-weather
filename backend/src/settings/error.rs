use std::error::Error;
use std::fmt::{Display, Formatter};

#[derive(Debug)]
pub enum SettingsError {
    SQLiteError(String),
    NoDefaultSettings,
}

impl Display for SettingsError {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        write!(f, "{:?}", self)
    }
}

impl Error for SettingsError {}
