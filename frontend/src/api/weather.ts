import {config} from "../config/config";
import {CurrentWeather} from "../model/weather";
import {Language} from "../model/settings";

export async function getCurrentWeather(city: string, language: Language): Promise<CurrentWeather> {
    const url = `${config.BACKEND_URL}/weather/current/${city}/${language.toString()}`;
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson as CurrentWeather;
}