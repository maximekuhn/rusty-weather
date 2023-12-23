import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import WeatherPage from "./pages/WeatherPage";
import SettingsPage from "./pages/SettingsPage";
import ForecastPage from "./pages/ForecastPage";
import Navbar from "./components/navbar/Navbar";
import {SettingsProvider} from "./config/SettingsContext";
import {ChakraProvider} from "@chakra-ui/react";
import "./i18n";
import {useTranslation} from "react-i18next";

function App() {
    const {t, i18n} = useTranslation();

    // Refresh the whole app if the language changes
    useEffect(() => {
        console.log(`Language changed to ${i18n.language}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language]);


    return (
        <div className="App">
            <header className="App-header">
                <ChakraProvider>
                    <SettingsProvider>
                        <Navbar/>
                        <Routes>
                            <Route path={"/"} element={<WeatherPage/>}/>
                            <Route path={"/forecast"} element={<ForecastPage/>}/>
                            <Route path={"/settings"} element={<SettingsPage/>}/>
                        </Routes>
                    </SettingsProvider>
                </ChakraProvider>
            </header>
        </div>
    );
}

export default App;
