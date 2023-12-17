import {FiRefreshCcw} from "react-icons/fi";
import {getCurrentSettings} from "../../api/settings";
import {useSettings} from "../../config/SettingsContext";


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
        <FiRefreshCcw onClick={queryAndUpdateSettings}/>
    );
}

export default NavbarRefreshSettingsButton;