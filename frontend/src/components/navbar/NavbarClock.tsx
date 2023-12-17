import React, {useEffect, useState} from "react";
import {config} from "../../config/config";
import {Box, Text} from "@chakra-ui/react";

function formatToDisplay(currentDate: Date): string {
    const hour = currentDate.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2});
    const minutes = currentDate.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2});
    const seconds = currentDate.getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2});
    const day = currentDate.toDateString();
    return `${day}: ${hour}:${minutes}:${seconds}`;
}

function NavbarClock() {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const displayedDate = formatToDisplay(currentDate);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, config.CLOCK_REFRESH_RATE_MS);

        return () => clearInterval(interval);
    }, []);

    return (
        <Box><Text fontSize={"xl"}>{displayedDate}</Text></Box>
    );
}

export default NavbarClock;