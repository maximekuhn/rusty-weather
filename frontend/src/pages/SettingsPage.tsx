import {useState} from "react";
import {Settings, useSettings} from "../config/SettingsContext";
import {UpdateSettings} from "../model/settings";
import {updateSettings} from "../api/settings";
import {isRaspberryPi} from "../utils/screenSize";
import RedirectToSettings from "../components/redirectToSettings/RedirectToSettings";
import LanguageSelector from "../components/languageSelector/LanguageSelector";

function SettingsPage() {
    const {settings, setSettings} = useSettings();
    const [cityInput, setCityInput] = useState<string>(settings.city)
    const isRPi = isRaspberryPi();

    function updateCityInput(value: string) {
        setCityInput(value);
    }

    function update() {
        const newSettings: UpdateSettings = {
            new_language: settings.language,
            new_current_city: cityInput
        };
        updateSettings(newSettings)
            .then((response) => {
                const updatedSettings: Settings = {
                    city: cityInput, language: settings.language
                };
                setSettings(updatedSettings);
            })
            .catch((err) => console.error(`Something went wrong: ${err}`));
    }

    return (
        <div>
            <h1>Settings</h1>
            {isRPi ? (<div>
                <RedirectToSettings/>
            </div>) : (
                <>
                    <p>city: </p>
                    <input type="text" onChange={(event) => updateCityInput(event.target.value)}/>
                    <button onClick={update}>update</button>
                    <LanguageSelector />
                </>
            )}
        </div>
    )
}

export default SettingsPage;