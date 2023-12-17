import {isRaspberryPi} from "../utils/screenSize";
import CurrentDayWeather from "../components/currentDayWeather/CurrentDayWeather";
import RedirectToSettings from "../components/redirectToSettings/RedirectToSettings";

function WeatherPage() {
    const isRPi: boolean = isRaspberryPi();

    return (
        <div>
            {isRPi ? (<CurrentDayWeather />) : (<RedirectToSettings />)}
        </div>
    );
}

export default WeatherPage;