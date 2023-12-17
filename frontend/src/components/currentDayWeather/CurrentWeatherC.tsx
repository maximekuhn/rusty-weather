import './CurrentDayWeather.css';
import {useSettings} from "../../config/SettingsContext";
import {useEffect, useState} from "react";
import {CurrentWeather} from "../../model/weather";
import {getCurrentWeather} from "../../api/weather";
import {config} from "../../config/config";

function CurrentWeatherC() {
    const {settings} = useSettings();
    const [currentWeather, setCurrentWeather] = useState<CurrentWeather | undefined>(undefined);

    function queryCurrentWeather() {
        getCurrentWeather(settings.city)
            .then((weather) => {
                setCurrentWeather(weather);
            })
            .catch((err) => console.error(`Something went wrong: ${err}`));
    }

    useEffect(() => {
        const interval = setInterval(() => {
            queryCurrentWeather();
        }, config.WEATHER_REFRESH_RATE_MS)
        queryCurrentWeather();
        return () => clearInterval(interval);
    }, [settings]);

    return (
        <div className="CurrentWeather">
            {!currentWeather ? (
                <p>No data yet</p>
            ) : (
                <div className={"CurrentWeatherDisplay"}>
                    <ul>
                        <li>{currentWeather.description}</li>
                        <li>{currentWeather.temperature}°C</li>
                        <li>humidity: {currentWeather.humidity_rate.toPrecision(2)}%</li>
                        <li>rain: {currentWeather.probability_of_precipitation ? currentWeather.probability_of_precipitation.toPrecision(2): "-"}%</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default CurrentWeatherC;