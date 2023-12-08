import {Link} from "react-router-dom";

interface NavbarItemProps {
    title: string;
    pathTo: string;
    isActive: boolean;
    onClick: () => void;
}

function NavbarItem({title, pathTo, isActive, onClick}: NavbarItemProps) {
    return (
        <div>
            <Link to={pathTo}>
                <button onClick={onClick}
                >{title}</button>
                {isActive ? (<p>active</p>) : (<p>not active</p>)}
            </Link>
        </div>
    );
}

export default NavbarItem;