import React from "react";
import {Button, Circle, IconButton} from "@chakra-ui/react";
import {MdBuild} from "react-icons/md";


function NavbarSettingsButton() {
    return (
        <IconButton aria-label={"Settings"} size={"lg"} icon={<MdBuild/>}/>
    );
}

export default NavbarSettingsButton;