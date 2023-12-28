import {Language} from "../model/settings";

export function strToLanguage(value: string): Language | undefined {
    switch (value.toLowerCase()) {
        case "en":
            return Language.English;
        case "fr":
            return Language.French;
        default:
            return undefined;
    }
}