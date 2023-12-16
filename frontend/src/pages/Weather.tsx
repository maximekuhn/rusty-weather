import {useEffect, useState} from "react";
import {CurrentWeather} from "../model/weather";
import {getCurrentWeather} from "../api/weather";

function Weather() {
    const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);

    function queryCurrentWeather() {
        getCurrentWeather("Paris").then((response) => {
            setCurrentWeather(response);
        }).catch((err) => console.error(`Something went wrong: ${err}`));
    }

    useEffect(() => {
        queryCurrentWeather();
    }, []);

    return (
        <div>
            {currentWeather != null && (
                <div>
                    <h1>Current weather</h1>
                    <ul>
                        <li>temperature: {currentWeather.temperature}°C</li>
                        <li>feels like: {currentWeather.feels_like}°C</li>
                        <li>pressure: {currentWeather.pressure}hPA</li>
                        <li>wind speed: {currentWeather.wind_speed}km/h</li>
                        <li>visibility: {currentWeather.visibility}m</li>
                        <li>pop: {currentWeather.probability_of_precipitation ?? "-"}%</li>
                        <li>sunrise: {currentWeather.sunrise}</li>
                        <li>sunset: {currentWeather.sunset}</li>
                        <li>description: {currentWeather.description}</li>
                    </ul>
                </div>
            )}
            <button onClick={queryCurrentWeather}>refresh</button>
        </div>
    );
}

export default Weather;