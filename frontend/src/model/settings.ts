export enum Language {
    English = "en",
}

export interface  Settings {
    current_city: string;
}

export interface UpdateSettings {
    new_current_city: string;
}