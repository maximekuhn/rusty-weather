import {config} from "../config/config";

export async function getCurrentWeather(): Promise<number> {
    const url = `${config.BACKEND_URL}/current`;
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson as number;
}