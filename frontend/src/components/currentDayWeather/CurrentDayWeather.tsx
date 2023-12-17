import CurrentWeatherC from "./CurrentWeatherC";
import ForecastWeather from "./ForecastWeather";
import './CurrentDayWeather.css';

function CurrentDayWeather() {
    return (
        <div className="CurrentDayWeather">
            <CurrentWeatherC />
            <ForecastWeather />
        </div>
    );
}

export default CurrentDayWeather;