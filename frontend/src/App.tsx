import React from 'react';
import {SettingsProvider} from "./config/SettingsContext";
import {ChakraProvider} from "@chakra-ui/react";
import i18n from "./i18n";
import {I18nextProvider} from "react-i18next";
import WeatherStation from "./WeatherStation";

function App() {
    return (
        <div className="App">
            <I18nextProvider i18n={i18n}>
                <ChakraProvider>
                    <SettingsProvider>
                        <WeatherStation/>
                    </SettingsProvider>
                </ChakraProvider>
            </I18nextProvider>
        </div>
    );
}

export default App;
