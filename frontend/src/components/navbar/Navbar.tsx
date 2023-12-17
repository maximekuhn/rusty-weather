import React, {useState} from "react";
import {useSettings} from "../../config/SettingsContext";
import {Box, Button, Center, Flex, Grid, GridItem} from "@chakra-ui/react";
import CityAndDate from "./CityAndDate";
import NavbarItem from "./NavbarItem";
import NavbarSettingsButton from "./NavbarSettingsButton";
import NavbarRefreshSettingsButton from "./NavbarRefreshSettingsButton";

function Navbar() {
    const {settings} = useSettings();
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
                    <NavbarItem pathTo={"/"} isActive={activeItem === "home"} onClick={() => setActiveItem("home")
                    } children={<Button>home</Button>}/>
                    <NavbarItem pathTo={"/forecast"} isActive={activeItem === "forecast"} onClick={() => setActiveItem("forecast")} children={<Button>forecast</Button>}/>
                    <NavbarItem pathTo={"/settings"} isActive={activeItem === "settings"} onClick={() => setActiveItem("settings")} children={<NavbarSettingsButton/>}/>
                    <NavbarItem pathTo={"/"} isActive={false} onClick={() => setActiveItem("home")} children={<NavbarRefreshSettingsButton/>}/>
                </Flex>
            </Box>
        </Flex>
    );
}

export default Navbar;