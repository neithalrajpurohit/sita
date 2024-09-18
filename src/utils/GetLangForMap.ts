export default function GetLangForMap() {
  var lang = sessionStorage.getItem("lang") || "enUS";

  // English: "enUS"
  // Spanish: "es"
  // French: "fr"
  // German: "de"
  // Italian: "it"
  // Portuguese: "pt"
  // Russian: "ru"
  // Chinese (Simplified): "zh-CN"
  // Chinese (Traditional): "zh-TW"
  // Japanese: "ja"
  // Korean: "ko"

  switch (lang) {
    case "enUS":
      return "enUS";

    case "es":
      return "es";

    default:
      return "enUS";
  }
}
