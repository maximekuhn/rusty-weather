import Navbar from "./components/navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import WeatherPage from "./pages/WeatherPage";
import ForecastPage from "./pages/ForecastPage";
import SettingsPage from "./pages/SettingsPage";
import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";

function WeatherStation() {
    const {i18n} = useTranslation();

    useEffect(() => {
        console.log(`Language changed to ${i18n.language}`);
    }, [i18n.language]);

    return (
        <>
            <Navbar/>
            <Routes>
                <Route path={"/"} element={<WeatherPage/>}/>
                <Route path={"/forecast"} element={<ForecastPage/>}/>
                <Route path={"/settings"} element={<SettingsPage/>}/>
            </Routes>
        </>
    );
}

export default WeatherStation;