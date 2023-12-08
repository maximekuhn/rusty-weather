import {Link} from "react-router-dom";

interface NavbarItemProps {
    title: string;
    pathTo: string;
    isActive: boolean;
}

function NavbarItem({title, pathTo, isActive}: NavbarItemProps) {
    return (
        <div>
            <Link to={pathTo}>
                <button color={isActive ? "green" : "red"}
                >{title}</button>
            </Link>
        </div>
    );
}

export default NavbarItem;