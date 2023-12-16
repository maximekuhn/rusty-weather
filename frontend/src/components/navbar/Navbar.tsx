import NavbarItem from "./NavbarItem";
import {useState} from "react";
import './Navbar.css';

function Navbar() {
    const [activeItem, setActiveItem] = useState<string>("home");

    function handeItemClick(title: string) {
        setActiveItem(title);
    }

    return (
        <div className="Navbar">
            <NavbarItem title={"home"} pathTo={"/"} isActive={activeItem === "home"}
                        onClick={() => handeItemClick("home")}/>
            <NavbarItem title={"forecast"} pathTo={"/forecast"} isActive={activeItem === "forecast"}
                        onClick={() => handeItemClick("forecast")}/>
            <NavbarItem title={"settings"} pathTo={"/settings"} isActive={activeItem === "settings"}
                        onClick={() => handeItemClick("settings")}/>
        </div>
    );
}

export default Navbar;