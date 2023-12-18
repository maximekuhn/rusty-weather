import ForecastWeather from "./ForecastWeather";
import CurrentWeatherCard from "./CurrentWeatherCard";
import {Box, Center, Flex, Spacer} from "@chakra-ui/react";
import React from "react";

function CurrentDayWeather() {
    return (
        <Center margin={"20px"} h={"100%"}>
            <Flex w={"100%"} alignContent={"right"} h={"100%"} bg={"yellow"}>
                <Box w={"58%"} h={"80%"}>
                    <CurrentWeatherCard/>
                </Box>
                <Spacer />
                <Box bg={"lightblue"} w={"38%"} h={"80%"}>
                    <ForecastWeather/>
                </Box>
            </Flex>
        </Center>
    );
}

export default CurrentDayWeather;