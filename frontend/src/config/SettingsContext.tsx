import React, {createContext, Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {config} from "./config";
import {getCurrentSettings} from "../api/settings";
import {Language} from "../model/settings";
import {strToLanguage} from "../utils/languageHelper";
import {useTranslation} from "react-i18next";

interface Settings {
    city: string;
    language: Language;
}

interface SettingsContextProps {
    settings: Settings;
    setSettings: Dispatch<SetStateAction<Settings>>;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

interface SettingsProviderProps {
    children: React.ReactNode;
}

const SettingsProvider: React.FC<SettingsProviderProps> = ({children}) => {
    const [settings, setSettings] = useState<Settings>({
        city: config.DEFAULT_CITY,
        language: config.DEFAULT_LANGUAGE,
    });
    const {i18n} = useTranslation();

    // Load settings current settings from the backend
    useEffect(() => {
        getCurrentSettings()
            .then((response) => {
                const settings: Settings = {
                    city: response.current_city,
                    language: response.language
                };
                setSettings(settings);

                // Update language in i18n
                i18n.changeLanguage(settings.language, () => {
                }).then((change) => {
                    change(settings.language);
                }).catch((err) => {
                    console.error("Failed to change i18n language");
                });
            })
            .catch((err) => console.error(`Something went wrong; ${err}`));

        // eslint-disable-next-line
    }, []);

    return (
        <SettingsContext.Provider value={{settings, setSettings}}>
            {children}
        </SettingsContext.Provider>
    )
}

const useSettings = (): SettingsContextProps => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
}

export {SettingsProvider, useSettings};
export type {Settings};
