import {getSettings, SETTINGS} from "../settings/settings";

function Settings() {
    const city = getSettings(SETTINGS.city);

    return (
        <div>
            <h1>City: {city}</h1>
        </div>
    );
}

export default Settings;