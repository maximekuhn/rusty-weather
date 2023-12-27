import Navbar from "./components/navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import WeatherPage from "./pages/WeatherPage";
import ForecastPage from "./pages/ForecastPage";
import SettingsPage from "./pages/SettingsPage";
import React from "react";

function WeatherStation() {
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