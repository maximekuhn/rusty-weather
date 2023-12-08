export function saveSettings(name: string, value: string) {
    localStorage.setItem(name, value);
}

export function getSettings(name: string): string {
    const city = localStorage.getItem(name);
    if (!city) return DEFAULT_SETTINGS.default_city;
    return city;
}

export const SETTINGS = {
    city: "USER_SETTINGS_CITY",
};

export const DEFAULT_SETTINGS = {
    default_city: "Paris",
}