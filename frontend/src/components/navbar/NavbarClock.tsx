import {useEffect, useState} from "react";

function NavbarClock() {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const displayedDate = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="NavbarClock">{displayedDate}</div>
    );
}

export default NavbarClock;