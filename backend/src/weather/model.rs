use std::str::FromStr;

use log::error;
use serde::{Deserialize, Serialize};

#[derive(Serialize)]
pub struct CurrentDayWeather {
    pub temperature: f32,
    pub feels_like: f32,
    pub pressure: f32,
    pub humidity_rate: f32,
    pub wind_speed: f32,
    pub visibility: f32,
    #[serde(default = "Option::None")]
    pub probability_of_precipitation: Option<f32>,
    pub sunset: i64,
    pub sunrise: i64,
    pub description: String,
    pub icon_name: Icon,
}

#[derive(Serialize)]
#[cfg_attr(test, derive(Eq, PartialEq, Debug))]
pub enum Icon {
    ClearSky,
    FewClouds,
    ScatteredClouds,
    BrokenClouds,
    ShowerRain,
    Rain,
    Thunderstorm,
    Snow,
    Mist,
}

#[derive(Serialize)]
pub struct ForecastWeather {
    pub highest_temperature: f32,
    pub lowest_temperature: f32,
    pub probability_of_precipitation: f32,
}

#[derive(Deserialize)]
pub struct OpenWeatherAPICurrent {
    weather: Vec<OpenWeatherAPICurrentWeather>,
    main: OpenWeatherAPICurrentMain,
    wind: OpenWeatherAPICurrentWind,
    sys: OpenWeatherAPICurrentSys,
    visibility: f32,
}

#[derive(Deserialize)]
pub struct OpenWeatherAPICurrentWeather {
    description: String,
    icon: String,
}

#[derive(Deserialize)]
pub struct OpenWeatherAPICurrentMain {
    temp: f32,
    feels_like: f32,
    pressure: f32,
    humidity: f32,
}

#[derive(Deserialize)]
pub struct OpenWeatherAPICurrentWind {
    speed: f32,
}

#[derive(Deserialize)]
pub struct OpenWeatherAPICurrentSys {
    sunset: i64,
    sunrise: i64,
}

#[derive(Deserialize)]
pub struct OpenWeatherAPIForecast5 {
    pub list: Vec<OpenWeatherAPIForecast5Data>,
}

#[derive(Deserialize)]
pub struct OpenWeatherAPIForecast5Data {
    pub pop: f32,
}

impl From<OpenWeatherAPICurrent> for CurrentDayWeather {
    fn from(current_weather: OpenWeatherAPICurrent) -> Self {
        let description = match current_weather.weather.first() {
            None => "",
            Some(weather) => &weather.description,
        };

        let icon = match current_weather.weather.first() {
            None => Icon::default(),
            Some(weather) => match weather.icon.parse::<Icon>() {
                Ok(icon) => icon,
                Err(err) => {
                    error!("Failed to parse icon str: {}", err);
                    Icon::default()
                }
            },
        };

        Self {
            temperature: current_weather.main.temp,
            feels_like: current_weather.main.feels_like,
            pressure: current_weather.main.pressure,
            humidity_rate: current_weather.main.humidity,
            wind_speed: current_weather.wind.speed,
            visibility: current_weather.visibility,
            probability_of_precipitation: None,
            sunset: current_weather.sys.sunset,
            sunrise: current_weather.sys.sunrise,
            description: description.to_string(),
            icon_name: icon,
        }
    }
}

impl FromStr for Icon {
    type Err = String;

    fn from_str(icon_str: &str) -> Result<Self, Self::Err> {
        // Parse open weather icons description
        // Remove 'd' or 'n' to only keep the icon id's number
        if icon_str.len() != 3 {
            return Err(format!("Could not parse icon_str: '{}'", icon_str));
        }
        let icon_id_number = icon_str[0..2]
            .parse::<i32>()
            .map_err(|err| err.to_string())?;

        match icon_id_number {
            1 => Ok(Self::ClearSky),
            2 => Ok(Self::FewClouds),
            3 => Ok(Self::ScatteredClouds),
            4 => Ok(Self::BrokenClouds),
            9 => Ok(Self::ShowerRain),
            10 => Ok(Self::Rain),
            11 => Ok(Self::Thunderstorm),
            13 => Ok(Self::Snow),
            50 => Ok(Self::Mist),
            other => Err(format!("Unknown icon id number: '{}'", other)),
        }
    }
}

impl Default for Icon {
    fn default() -> Self {
        // randomly chosen
        Self::FewClouds
    }
}

#[cfg(test)]
mod tests {
    use crate::weather::model::Icon;
    use rstest::rstest;

    #[rstest]
    #[case(vec!["01d", "01n"], Icon::ClearSky)]
    #[case(vec!["02d", "02n"], Icon::FewClouds)]
    #[case(vec!["03d", "03n"], Icon::ScatteredClouds)]
    #[case(vec!["04d", "04n"], Icon::BrokenClouds)]
    #[case(vec!["09d", "09n"], Icon::ShowerRain)]
    #[case(vec!["10d", "10n"], Icon::Rain)]
    #[case(vec!["11d", "11n"], Icon::Thunderstorm)]
    #[case(vec!["13d", "13n"], Icon::Snow)]
    #[case(vec!["50d", "50n"], Icon::Mist)]
    fn test_parse_icon_from_str(#[case] inputs: Vec<&str>, #[case] expected: Icon) {
        for input in inputs {
            let actual = input.parse::<Icon>().unwrap();
            assert_eq!(expected, actual);
        }
    }
}
