import {useSettings} from "../../config/SettingsContext";
import React from "react";
import {Box, Text, VStack} from "@chakra-ui/react";
import NavbarClock from "./NavbarClock";

function CityAndDate() {
    const {settings} = useSettings();

    return (
        <Box display="inline-flex" w="100%">
            <VStack w={"100%"} alignItems={"left"} paddingTop={"5px"} paddingBottom={"5px"}>
                <Text fontSize={"2xl"} w={"100%"}>{settings.city}</Text>
                <NavbarClock/>
            </VStack>
        </Box>
    );
}

export default CityAndDate;