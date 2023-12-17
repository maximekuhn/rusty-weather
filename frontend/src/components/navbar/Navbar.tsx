import NavbarItem from "./NavbarItem";
import {useState} from "react";
import './Navbar.css';
import {useSettings} from "../../config/SettingsContext";
import NavbarClock from "./NavbarClock";

function Navbar() {
    const {settings, setSettings} = useSettings();
    const [activeItem, setActiveItem] = useState<string>("home");

    function handeItemClick(title: string) {
        setActiveItem(title);
    }

    return (
        <div className="Navbar">
            <h1>{settings.city}</h1>
            <NavbarItem title={"home"} pathTo={"/"} isActive={activeItem === "home"}
                        onClick={() => handeItemClick("home")}/>
            <NavbarItem title={"forecast"} pathTo={"/forecast"} isActive={activeItem === "forecast"}
                        onClick={() => handeItemClick("forecast")}/>
            <NavbarItem title={"settings"} pathTo={"/settings"} isActive={activeItem === "settings"}
                        onClick={() => handeItemClick("settings")}/>
            <NavbarClock/>
        </div>
    );
}

export default Navbar;