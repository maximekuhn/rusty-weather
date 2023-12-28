import {Box, Card, CardBody, CardFooter, CardHeader, Center, Flex, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {CurrentWeather} from "../../model/weather";
import {getCurrentWeather} from "../../api/weather";
import {useSettings} from "../../config/SettingsContext";
import {config} from "../../config/config";
import {MdCheckCircle, MdError} from "react-icons/md";
import {WiGaleWarning, WiHumidity, WiRain, WiStrongWind, WiSunrise, WiSunset} from "react-icons/wi";
import {epochToDate} from "../../utils/dateAndTimeHelper";
import {getWeatherIcon} from "../../utils/iconHelper";

interface WeatherInfoProps {
    icon: React.ReactNode;
    text: string;
}

function WeatherInfo({icon, text}: WeatherInfoProps) {
    return (
        <Flex alignItems={"center"}>
            <Box w={"25%"}>
                {icon}
            </Box>
            <Box>
                <Text fontSize={"xl"}>
                    {text}
                </Text>

            </Box>
        </Flex>
    );
}

function formatDate(epoch: number): string {
    const asDate = epochToDate(epoch);
    const hour = asDate.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2});
    const minutes = asDate.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2});
    return `${hour}h${minutes}`;
}

function CurrentWeatherCard() {
    const [weather, setWeather] = useState<CurrentWeather | undefined>(undefined);
    const [lastRefreshStatus, setLastRefreshStatus] = useState<boolean>(false);
    const [lastRefreshDate, setLastRefreshDate] = useState<Date | undefined>(undefined);
    const {settings} = useSettings();

    const sunsetDate = weather?.sunset ? formatDate(weather.sunset) : undefined;
    const sunriseDate = weather?.sunrise ? formatDate(weather.sunrise) : undefined;
    const weatherIcon = getWeatherIcon(weather?.icon_name, "75px");

    function queryWeather() {
        getCurrentWeather(settings.city, settings.language)
            .then((response) => {
                setWeather(response);
                setLastRefreshStatus(true);
                setLastRefreshDate(new Date());
            })
            .catch((err) => {
                console.error(`Something went wrong: ${err}`);
                setLastRefreshStatus(false);
                setLastRefreshDate(undefined);
            });
    }

    useEffect(() => {
        const interval = setInterval(() => {
            queryWeather();
        }, config.WEATHER_REFRESH_RATE_MS);
        queryWeather();
        return () => clearInterval(interval);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [settings]);

    // TODO: depending on the weatherIcon, the Box's height seems to change size
    return (
        <Card borderRadius={"6px"} h={"100%"} border={"2px solid black"}>
            <CardHeader h={"30%"} padding={"0"} borderBottom={"1px solid black"}>
                <Flex h={"100%"}>
                    <Box w={"25%"} h={"100%"} paddingTop={"5px"} borderRight={"1px solid black"}>
                        <Center>
                            {weatherIcon}
                        </Center>
                    </Box>
                    <Box margin={"auto"} w={"60%"}>
                        <Flex alignItems={"center"}>
                            <Box w={"70%"}>
                                <Text fontSize={"2xl"}
                                      wordBreak={"break-word"}
                                      style={{textTransform: "capitalize"}}>{weather?.description}</Text>
                            </Box>
                            <Box>
                                <Text fontSize={"2xl"}
                                      fontWeight={"semibold"}>{weather?.temperature.toFixed(1)}°C</Text>
                            </Box>
                        </Flex>
                    </Box>
                </Flex>
            </CardHeader>
            <CardBody padding={"0"} paddingLeft={"10px"} borderBottom={"1px solid black"}>
                <Flex marginTop={"10px"} marginBottom={"10px"}>
                    <Box w={"50%"}>
                        <Flex direction={"column"}>
                            <WeatherInfo icon={<WiHumidity size={"50px"}/>}
                                         text={`${weather?.humidity_rate.toFixed(1).toString() ?? "-"}%`}/>
                            <WeatherInfo icon={<WiRain size={"50px"}/>}
                                         text={`${weather?.probability_of_precipitation?.toFixed(1).toString() ?? "-"}%`}/>
                            <WeatherInfo icon={<WiStrongWind size={"50px"}/>}
                                         text={`${weather?.wind_speed.toFixed(1).toString() ?? "-"} km/h`}/>
                        </Flex>
                    </Box>
                    <Box w={"50%"}>
                        <WeatherInfo icon={<WiGaleWarning size={"50px"}/>}
                                     text={`${weather?.pressure.toFixed(0).toString() ?? "-"} hPa`}/>
                        <WeatherInfo icon={<WiSunrise size={"50px"}/>} text={`${sunriseDate ?? "-"}`}/>
                        <WeatherInfo icon={<WiSunset size={"50px"}/>} text={`${sunsetDate ?? "-"}`}/>
                    </Box>
                </Flex>
            </CardBody>
            <CardFooter>
                <Flex w={"100%"}>
                    <Box w={"50%"}>
                        <Center>
                            {lastRefreshStatus ? (<MdCheckCircle color={"green"} size={"10%"}/>) : (
                                <MdError color={"red"} size={"10px"}/>)}
                        </Center>
                    </Box>
                    <Box>
                        {lastRefreshDate ? (lastRefreshDate.toISOString()) : ("-")}
                    </Box>
                </Flex>
            </CardFooter>
        </Card>
    );
}

export default CurrentWeatherCard;