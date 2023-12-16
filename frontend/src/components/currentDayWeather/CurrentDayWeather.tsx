import {getCurrentWeather} from "../../api/weather";
import {useEffect, useState} from "react";
import {CurrentWeather} from "../../model/weather";
import './CurrentDayWeather.css';

function CurrentDayWeather() {
    const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);

    function queryCurrentWeather() {
        getCurrentWeather("Paris")
            .then((response) => {
                setCurrentWeather(response);
            })
            .catch((err) => console.error(`Something went wrong: ${err}`));
    }

    useEffect(() => {
        queryCurrentWeather();
    }, []);

    return (
        <div className="CurrentDayWeather">
            <ul>
                <li>temperature: {currentWeather?.temperature}°C</li>
                <li>{currentWeather?.description}</li>
            </ul>
            <button onClick={queryCurrentWeather}>refresh</button>
        </div>
    );
}

export default CurrentDayWeather;