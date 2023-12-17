import {isRaspberryPi} from "../utils/screenSize";
import RedirectToSettings from "../components/redirectToSettings/RedirectToSettings";

function ForecastPage() {
    const isRPi = isRaspberryPi();

    return (
        <div>
            <h1>Forecast</h1>
            {isRPi ? (<p>rpi</p>) : (<RedirectToSettings />)}
        </div>
    );
}

export default ForecastPage;