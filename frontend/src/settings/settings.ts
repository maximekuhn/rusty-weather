export function saveSettings(name: string, value: string) {
    localStorage.setItem(name, value);
}

export function getSettings(name: string): string | null {
    return localStorage.getItem(name);
}

export const SETTINGS = {
    city: "USER_SETTINGS_CITY",
};

export const DEFAULT_SETTINGS = {
    default_city: "Paris",
}