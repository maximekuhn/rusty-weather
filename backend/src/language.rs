use std::fmt::{Display, Formatter};
use std::str::FromStr;

use serde::Serialize;
use serde_with::DeserializeFromStr;
use sqlx::Type;

#[derive(DeserializeFromStr, Debug, Serialize, Type)]
#[cfg_attr(test, derive(Eq, PartialEq))]
pub enum Language {
    #[sqlx(rename = "en")]
    English,
    #[sqlx(rename = "fr")]
    French,
}

impl FromStr for Language {
    type Err = &'static str;

    fn from_str(language_str: &str) -> Result<Self, Self::Err> {
        Ok(match language_str.to_lowercase().as_str() {
            "fr" | "french" => Self::French,
            "en" | "english" => Self::English,
            _ => Self::English,
        })

        // Quick note: pattern matching for english variations is not required because default
        // is set to english. However, this might help in the future if the default language is
        // changed to another one.
    }
}

impl Display for Language {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "{}",
            match self {
                Language::English => "en",
                Language::French => "fr",
            }
        )
    }
}

#[cfg(test)]
mod tests {
    use rstest::rstest;

    use crate::language::Language;

    #[rstest]
    #[case("en", Language::English)]
    #[case("EN", Language::English)]
    #[case("eN", Language::English)]
    #[case("english", Language::English)]
    #[case("English", Language::English)]
    #[case("fr", Language::French)]
    #[case("FR", Language::French)]
    #[case("Fr", Language::French)]
    #[case("french", Language::French)]
    #[case("French", Language::French)]
    fn test_parse(#[case] input: &str, #[case] expected: Language) {
        let actual = input.parse::<Language>().unwrap();
        assert_eq!(expected, actual);
    }

    #[test]
    fn test_english_should_be_default_language() {
        let misspelled_language_str = "frch";
        let parsed_language = misspelled_language_str.parse::<Language>().unwrap();
        assert_eq!(Language::English, parsed_language);
    }

    #[rstest]
    #[case(Language::English, "en")]
    #[case(Language::French, "fr")]
    fn test_display_language(#[case] input: Language, #[case] expected: &str) {
        assert_eq!(expected, format!("{}", input));
    }
}
