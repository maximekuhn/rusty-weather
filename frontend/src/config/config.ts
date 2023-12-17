import {Language} from "./SettingsContext";

// -- URL settings
const isDevelopment = process.env.NODE_ENV === "development";
let backendURL;
let settingsURL;
if (isDevelopment) {
    // change this to your local IP address
    backendURL = "http://192.168.1.19:9999/api";
    settingsURL = "http://192.168.1.19:3000/settings";
} else {
    // assumes rust backend is running on the same machine as frontend nginx
    backendURL = `http://${window.location.hostname}:${window.location.port}/api`;
    settingsURL = `http://${window.location.hostname}:${window.location.port}/settings`;
}

// -- Timer settings
const WEATHER_REFRESH_RATE_SECONDS: number = 60 * 5; // 5 minutes
const CLOCK_REFRESH_RATE_SECONDS: number = 1;

// -- Raspberry Pi external screen dimensions
const RPI_SCREEN_SIZE_WIDTH: number = 800;
const RPI_SCREEN_SIZE_HEIGHT: number = 480;


// -- Export config
export const config = {
    BACKEND_URL: backendURL,
    SETTINGS_URL: settingsURL,
    DEFAULT_CITY: "Paris",
    DEFAULT_LANGUAGE: Language.English,
    WEATHER_REFRESH_RATE_MS: WEATHER_REFRESH_RATE_SECONDS * 1000,
    CLOCK_REFRESH_RATE_MS: CLOCK_REFRESH_RATE_SECONDS * 1000,
    RPI_SCREEN_SIZE_HEIGHT: RPI_SCREEN_SIZE_HEIGHT,
    RPI_SCREEN_SIZE_WIDTH: RPI_SCREEN_SIZE_WIDTH
};
