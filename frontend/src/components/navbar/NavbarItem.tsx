import {Link} from "react-router-dom";

interface NavbarItemProps {
    title: string;
    pathTo: string;
    isActive: boolean;
    onClick: () => void;
}

function NavbarItem({title, pathTo, isActive, onClick}: NavbarItemProps) {
    return (
        <div onClick={onClick} className={isActive ? ("NavbarItemActive") : ("NavbarItem")}>
            <Link to={pathTo}>
                <button>{title}</button>
            </Link>
        </div>
    );
}

export default NavbarItem;