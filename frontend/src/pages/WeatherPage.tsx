import {isRaspberryPi} from "../utils/screenSize";
import CurrentDayWeather from "../components/currentDayWeather/CurrentDayWeather";

function WeatherPage() {
    const isRPi: boolean = isRaspberryPi();
    return (
        <div>
            <h1>Weather</h1>
            {isRPi ? (<CurrentDayWeather />) : (<div>Something else than Raspberry PI</div>)}
        </div>
    );
}

export default WeatherPage;