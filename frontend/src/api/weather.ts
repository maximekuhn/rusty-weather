import {config} from "../config/config";
import {CurrentWeather} from "../model/weather";

export async function getCurrentWeather(city: string): Promise<CurrentWeather> {
    const url = `${config.BACKEND_URL}/weather/current/${city}/en`;
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson as CurrentWeather;
}