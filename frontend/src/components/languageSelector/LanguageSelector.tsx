import {Select} from "@chakra-ui/react";
import {Language} from "../../model/settings";
import {useTranslation} from "react-i18next";
import {Settings, useSettings} from "../../config/SettingsContext";
import {strToLanguage} from "../../utils/languageHelper";


function LanguageSelector() {
    const {i18n} = useTranslation();
    const {settings, setSettings} = useSettings();

    function updateLanguage(languageStr: string) {
        // Update language in settings
        const language = strToLanguage(languageStr);
        if (!language) return;
        const newSettings: Settings = {
            city: settings.city, language: language!
        };
        setSettings(newSettings);

        // TODO: update selected language in the backend (API call)


        // Update language in i18n
        i18n.changeLanguage(languageStr, () => {
        }).then((change) => {
            change(languageStr);
        }).catch((err) => {
            console.error("Failed to change i18n language");
        });
    }

    return (
        <Select placeholder={"Select a language"} onChange={(event) => updateLanguage(event.target.value.toString())}>
            <option value={Language.English.toString()}>english</option>
            <option value={Language.French.toString()}>french</option>
        </Select>
    );
}

export default LanguageSelector;