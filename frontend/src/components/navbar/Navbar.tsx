import NavbarItem from "./NavbarItem";

function Navbar() {
    return (
        <div>
            <NavbarItem title={"home"} pathTo={"/"} isActive={false} />
            <NavbarItem title={"forecast"} pathTo={"/forecast"} isActive={false} />
            <NavbarItem title={"settings"} pathTo={"/settings"} isActive={false} />
        </div>
    );
}

export default Navbar;