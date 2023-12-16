import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import Weather from "./pages/Weather";
import Settings from "./pages/Settings";
import {DEFAULT_SETTINGS, getSettings, saveSettings, SETTINGS} from "./settings/settings";
import Forecast from "./pages/Forecast";
import Navbar from "./components/navbar/Navbar";

function App() {

    useEffect(() => {
        if (!getSettings(SETTINGS.city)) {
            saveSettings(SETTINGS.city, DEFAULT_SETTINGS.default_city);
        }
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <Navbar />
                <Routes>
                    <Route path={"/"} element={<Weather/>}/>
                    <Route path={"/forecast"} element={<Forecast/>}/>
                    <Route path={"/settings"} element={<Settings/>}/>
                </Routes>
            </header>
        </div>
    );
}

export default App;
