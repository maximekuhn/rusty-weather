import React from 'react';
import {Route, Routes} from "react-router-dom";
import WeatherPage from "./pages/WeatherPage";
import SettingsPage from "./pages/SettingsPage";
import ForecastPage from "./pages/ForecastPage";
import Navbar from "./components/navbar/Navbar";
import './App.css';

function App() {

    return (
        <div className="App">
            <header className="App-header">
                <Navbar/>
                <Routes>
                    <Route path={"/"} element={<WeatherPage/>}/>
                    <Route path={"/forecast"} element={<ForecastPage/>}/>
                    <Route path={"/settings"} element={<SettingsPage/>}/>
                </Routes>
            </header>
        </div>
    );
}

export default App;
