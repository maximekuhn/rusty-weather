import {Language} from "./SettingsContext";

const isDevelopment = process.env.NODE_ENV === "development";
let backendURL;
if (isDevelopment) {
    // assumes rust backend is up and running
    backendURL = "http://localhost:9999/api";
} else {
    // assumes rust backend is running on the same machine as frontend nginx
    backendURL = "/api";
}

export const config = {
    BACKEND_URL: backendURL,
    DEFAULT_CITY: "Paris",
    DEFAULT_LANGUAGE: Language.English,
};
