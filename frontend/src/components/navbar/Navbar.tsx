import NavbarItem from "./NavbarItem";
import {useState} from "react";
import './Navbar.css';
import {useSettings} from "../../config/SettingsContext";
import NavbarClock from "./NavbarClock";
import NavbarSettingsButton from "./NavbarSettingsButton";
import NavbarRefreshSettingsButton from "./NavbarRefreshSettingsButton";

function Navbar() {
    const {settings} = useSettings();
    const [activeItem, setActiveItem] = useState<string>("home");

    function handeItemClick(title: string) {
        setActiveItem(title);
    }

    return (
        <div className="Navbar">
            <div className="NavbarCityClock">
                <h1>{settings.city}</h1>
                <NavbarClock/>
            </div>
            <div className="NavbarItems">
                <NavbarItem pathTo={"/"} isActive={activeItem === "home"}
                            onClick={() => handeItemClick("home")} children={<p>home</p>}/>
                <NavbarItem pathTo={"/forecast"} isActive={activeItem === "forecast"}
                            onClick={() => handeItemClick("forecast")} children={<p>forecast</p>}/>
                <NavbarItem pathTo={"/settings"} isActive={activeItem === "settings"}
                            onClick={() => handeItemClick("settings")} children={<NavbarSettingsButton/>}/>
                <NavbarItem pathTo={"/"} isActive={false} onClick={() => handeItemClick("home")}
                            children={<NavbarRefreshSettingsButton/>}/>
            </div>
        </div>
    );
}

export default Navbar;