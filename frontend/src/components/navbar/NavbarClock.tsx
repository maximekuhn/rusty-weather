import {useEffect, useState} from "react";
import {config} from "../../config/config";

function NavbarClock() {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const displayedDate = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, config.CLOCK_REFRESH_RATE_MS);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="NavbarClock">{displayedDate}</div>
    );
}

export default NavbarClock;