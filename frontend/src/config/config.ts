import {Language} from "./SettingsContext";

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

export const config = {
    BACKEND_URL: backendURL,
    SETTINGS_URL: settingsURL,
    DEFAULT_CITY: "Paris",
    DEFAULT_LANGUAGE: Language.English,
};
