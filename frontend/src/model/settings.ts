export enum Language {
    English = "en",
    French = "fr",
}

export interface  Settings {
    current_city: string;
    language: Language;
}

export interface UpdateSettings {
    new_current_city: string;
    new_language: Language;
}