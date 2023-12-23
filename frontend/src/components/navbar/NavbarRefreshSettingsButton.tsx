import {getCurrentSettings} from "../../api/settings";
import {useSettings} from "../../config/SettingsContext";
import {IconButton} from "@chakra-ui/react";
import {MdRefresh} from "react-icons/md";
import React from "react";


function NavbarRefreshSettingsButton() {
    const {settings, setSettings} = useSettings();

    function queryAndUpdateSettings() {
        getCurrentSettings().then((currentSettings) => {
            setSettings({
                city: currentSettings.current_city, language: settings.language

            });
        }).catch((err) => console.error(`Something went wrong: ${err}`));
    }

    return (
        <IconButton  aria-label={"Refresh settings"} icon={<MdRefresh />} onClick={queryAndUpdateSettings} size={"lg"}/>
    );
}

export default NavbarRefreshSettingsButton;