import QRCode from "react-qr-code";
import {config} from "../../config/config";
import React from "react";
import {Link} from "react-router-dom";

function RedirectToSettings() {
    const settingsURL = config.SETTINGS_URL;

    return (<div className="RedirectToSettings">
        <QRCode value={settingsURL} />
        <Link to="/settings"><button>Go to settings</button></Link>
    </div>);
}

export default RedirectToSettings;