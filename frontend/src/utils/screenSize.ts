import {config} from "../config/config";

export function isRaspberryPi(): boolean {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    return (screenWidth === config.RPI_SCREEN_SIZE_WIDTH) && (screenHeight === config.RPI_SCREEN_SIZE_HEIGHT);
}