import {
    Box,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Center,
    Flex,
    Heading,
    Image,
    List, ListIcon,
    ListItem, Spacer,
    Text
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {CurrentWeather} from "../../model/weather";
import {getCurrentWeather} from "../../api/weather";
import {useSettings} from "../../config/SettingsContext";
import {config} from "../../config/config";
import {MdCheckCircle, MdError} from "react-icons/md";

function CurrentWeatherCard() {
    const [weather, setWeather] = useState<CurrentWeather | undefined>(undefined);
    const [lastRefreshStatus, setLastRefreshStatus] = useState<boolean>(false);
    const [lastRefreshDate, setLastRefreshDate] = useState<Date | undefined>(undefined);
    const {settings} = useSettings();

    function queryWeather() {
        getCurrentWeather(settings.city)
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
    }, [settings]);

    return (
        <Card bg={"tomato"} borderRadius={"6px"} h={"100%"} border={"2px solid black"}>
            <CardHeader bg={"lightgreen"} h={"30%"} padding={"0"}>
                <Flex bg={"lightcoral"} h={"100%"}>
                    <Box w={"25%"} bg={"lavender"}>
                        <Image src={"https://d29fhpw069ctt2.cloudfront.net/icon/image/84559/preview.svg"}
                               boxSize={"100%"} bg={"lightsteelblue"}/>
                    </Box>
                    <Box margin={"auto"} w={"60%"}>
                        <Flex alignItems={"center"}>
                            <Box w={"70%"}>
                                <Text fontSize={"2xl"}
                                      wordBreak={"break-word"}
                                      style={{textTransform: "capitalize"}}>{weather?.description}</Text>
                            </Box>
                            <Box>
                                <Text fontSize={"2xl"} fontWeight={"semibold"}>{weather?.temperature.toFixed(1)}°C</Text>
                            </Box>
                        </Flex>
                    </Box>
                </Flex>
            </CardHeader>
            <CardBody bg={"lightsalmon"}>
                <List>
                    <ListItem>
                        {weather?.wind_speed}km/h
                    </ListItem>
                    <ListItem>
                        {weather?.humidity_rate}%
                    </ListItem>
                    <ListItem>
                        {weather?.probability_of_precipitation}%
                    </ListItem>
                </List>
            </CardBody>
            <CardFooter bg={"lightskyblue"}>
                <Flex w={"100%"}>
                    <Box w={"50%"}>
                        <Center>

                            {lastRefreshStatus ? (<MdCheckCircle color={"green"} size={"40%"}/>) : (
                                <MdError color={"red"} size={"40%"}/>)}
                        </Center>
                    </Box>
                    <Box>
                        {lastRefreshDate ? (lastRefreshDate.toString()) : ("-")}
                    </Box>
                </Flex>
            </CardFooter>
        </Card>
    );
}

export default CurrentWeatherCard;