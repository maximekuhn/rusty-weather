import {useEffect, useState} from "react";

async function getCurrentWeather(): Promise<number> {
    const url = `http://backend:9999/api/current`;
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson as number;
}

function Weather() {
    const [currentTemperature, setCurrentTemparature] = useState<number | null>(null);

    function getTemperature() {
        getCurrentWeather().then((number) => {
            setCurrentTemparature(number);
        }).catch((err) => console.error(`An error occured: ${err}`));
    }

    useEffect(() => {
        getTemperature();
    }, []);

    return (
        <>
            <h1>Hello, rusty weather</h1>
            <div>Current temperature is: {currentTemperature != null ? (<div>{currentTemperature}°C</div>) : (
                <div>No data yet</div>)}</div>
            <button onClick={getTemperature} style={{
                width: "200px",
                fontSize: 36
            }}>refresh</button>
        </>
    );
}

export default Weather;