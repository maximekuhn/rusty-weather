const RASPBERRY_PI_SCREEN_WIDTH: number = 800;
const RASPBERRY_PI_SCREEN_HEIGHT: number = 480;

export function isRaspberryPi(): boolean {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    return (screenWidth === RASPBERRY_PI_SCREEN_WIDTH) && (screenHeight === RASPBERRY_PI_SCREEN_HEIGHT);
}