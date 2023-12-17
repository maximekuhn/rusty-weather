import {getCurrentWeather} from "../../api/weather";
import {useEffect, useState} from "react";
import {CurrentWeather} from "../../model/weather";
import './CurrentDayWeather.css';
import {Language, useSettings} from "../../config/SettingsContext";

function CurrentDayWeather() {
    const {settings} = useSettings();
    const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
    const [lastRefreshDate, setLastRefreshDate] = useState<Date | undefined>(undefined);

    function queryCurrentWeather() {
        getCurrentWeather(settings.city)
            .then((response) => {
                setCurrentWeather(response);
                setLastRefreshDate(new Date());
            })
            .catch((err) => console.error(`Something went wrong: ${err}`));
    }

    useEffect(() => {
        const interval = setInterval(() => {
            queryCurrentWeather();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="CurrentDayWeather">
            <p>city: {settings.city}</p>
            <p>language: {Language[settings.language]}</p>
            <ul>
                <li>temperature: {currentWeather?.temperature}°C</li>
                <li>{currentWeather?.description}</li>
            </ul>
            <button onClick={queryCurrentWeather}>refresh</button>
            <p>last refresh date: {lastRefreshDate ? (<>
                {lastRefreshDate.getHours()}:{lastRefreshDate.getMinutes()}:{lastRefreshDate.getSeconds()}
            </>) : (<>never</>)}</p>
        </div>
    );
}

export default CurrentDayWeather;