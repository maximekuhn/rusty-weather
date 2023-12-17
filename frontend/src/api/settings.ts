import {Settings, UpdateSettings} from "../model/settings";
import {config} from "../config/config";

export async function getCurrentSettings(): Promise<Settings> {
    const url = `${config.BACKEND_URL}/settings/current`;
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson as Settings;
}

export async function updateSettings(newSettings: UpdateSettings): Promise<void> {
    const url = `${config.BACKEND_URL}/settings/update`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newSettings)
    })
    if (!response.status.toString().startsWith("2")) {
        console.error("Something went wrong");
    }
}