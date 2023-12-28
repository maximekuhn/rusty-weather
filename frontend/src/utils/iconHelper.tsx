import {Icon} from "../model/weather";
import {
    WiCloud,
    WiCloudy,
    WiDayCloudy, WiDayCloudyGusts,
    WiDayFog,
    WiDayHail,
    WiDayRain,
    WiDaySnow,
    WiDaySunny,
    WiDayThunderstorm
} from "react-icons/wi";

export function getWeatherIcon(icon: Icon | undefined, size: string): React.ReactNode {
    switch (icon) {
        case Icon.ClearSky:
            return <WiDaySunny size={size}/>
        case Icon.FewClouds:
            return <WiCloudy size={size}/>
        case Icon.ScatteredClouds:
            return <WiDayCloudy size={size}/>
        case Icon.BrokenClouds:
            return <WiDayCloudy size={size}/>
        case Icon.ShowerRain:
            return <WiDayRain size={size}/>
        case Icon.Rain:
            return <WiDayRain size={size}/>
        case Icon.Thunderstorm:
            return <WiDayThunderstorm size={size}/>
        case Icon.Snow:
            return <WiDaySnow size={size}/>
        case Icon.Mist:
            return <WiDayFog size={size}/>
        default:
            return <WiCloud size={size}/>;
    }
}