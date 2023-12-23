import React, {useState} from "react";
import {Box, Button, Flex} from "@chakra-ui/react";
import CityAndDate from "./CityAndDate";
import NavbarItem from "./NavbarItem";
import NavbarSettingsButton from "./NavbarSettingsButton";
import NavbarRefreshSettingsButton from "./NavbarRefreshSettingsButton";

function Navbar() {
    const [activeItem, setActiveItem] = useState<string>("home");

    function handeItemClick(title: string) {
        setActiveItem(title);
    }

    return (
        <Flex margin={"10px"} borderRadius={"6px"} border={"2px solid black"}>
            <Box w={"35%"} paddingLeft={"10px"} borderRight={"1px solid black"}>
                <CityAndDate/>
            </Box>
            <Box w={"65%"}>
                <Flex h={"100%"}>
                    <NavbarItem pathTo={"/"} isActive={activeItem === "home"} onClick={() => handeItemClick("home")
                    } children={<Button size={"lg"}>home</Button>}/>
                    <NavbarItem pathTo={"/forecast"} isActive={activeItem === "forecast"}
                                onClick={() => handeItemClick("forecast")}
                                children={<Button size={"lg"}>forecast</Button>}/>
                    <NavbarItem pathTo={"/settings"} isActive={activeItem === "settings"}
                                onClick={() => handeItemClick("settings")} children={<NavbarSettingsButton/>}/>
                    <NavbarItem pathTo={"/"} isActive={false} onClick={() => handeItemClick("home")}
                                children={<NavbarRefreshSettingsButton/>}/>
                </Flex>
            </Box>
        </Flex>
    );
}

export default Navbar;