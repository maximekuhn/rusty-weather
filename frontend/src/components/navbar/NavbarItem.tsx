import {Link} from "react-router-dom";
import {ReactNode} from "react";

interface NavbarItemProps {
    pathTo: string;
    isActive: boolean;
    onClick: () => void;
    children: ReactNode;
}

function NavbarItem({pathTo, isActive, onClick, children}: NavbarItemProps) {
    return (
        <div className={isActive ? "NavbarItemActive NavbarItem" : "NavbarItem"} onClick={onClick}>
            <Link to={pathTo}>
                {children}
            </Link>
        </div>
    );
}

export default NavbarItem;