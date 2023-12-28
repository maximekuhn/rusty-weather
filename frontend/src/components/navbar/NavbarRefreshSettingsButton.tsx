import {getCurrentSettings} from "../../api/settings";
import {useSettings} from "../../config/SettingsContext";
import {IconButton} from "@chakra-ui/react";
import {MdRefresh} from "react-icons/md";
import React from "react";
import {useTranslation} from "react-i18next";


function NavbarRefreshSettingsButton() {
    const { setSettings} = useSettings();
    const {i18n} = useTranslation();

    function queryAndUpdateSettings() {
        getCurrentSettings().then((currentSettings) => {
            setSettings({
                city: currentSettings.current_city, language: currentSettings.language
            });
            // Update language in i18n
            i18n.changeLanguage(currentSettings.language, () => {
            }).then((change) => {
                change(currentSettings.language);
            }).catch((err) => {
                console.error("Failed to change i18n language");
            });
        }).catch((err) => console.error(`Something went wrong: ${err}`));
    }

    return (
        <IconButton aria-label={"Refresh settings"} icon={<MdRefresh/>} onClick={queryAndUpdateSettings} size={"lg"}/>
    );
}

export default NavbarRefreshSettingsButton;