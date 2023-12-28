import {isRaspberryPi} from "../utils/screenSize";
import CurrentDayWeather from "../components/currentDayWeather/CurrentDayWeather";
import RedirectToSettings from "../components/redirectToSettings/RedirectToSettings";
import {Box} from "@chakra-ui/react";

function WeatherPage() {
    const isRPi: boolean = isRaspberryPi();

    return (
        <div>
            {isRPi ? (
                <Box bg={"pink"} h={"350px"}>
                    <CurrentDayWeather/>
                </Box>
            ) : (<RedirectToSettings/>)}
        </div>
    );
}

export default WeatherPage;