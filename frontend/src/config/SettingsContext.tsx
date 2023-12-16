import React, {createContext, Dispatch, SetStateAction, useContext, useState} from "react";
import {config} from "./config";

enum Language {
    English,
}

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
    })
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

export {SettingsProvider, useSettings, Language};