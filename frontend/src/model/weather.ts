export interface CurrentWeather {
    temperature: number;
    feels_like: number;
    pressure: number;
    humidity_rate: number;
    wind_speed: number;
    visibility: number;
    probability_of_precipitation: number | undefined;
    sunset: number;
    sunrise: number;
    description: string;
}