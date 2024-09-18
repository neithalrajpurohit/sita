import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function useTranslateCalendar(runTranslation: boolean): void {
  const { t } = useTranslation();

  useEffect(() => {
    if (runTranslation) {
      const inputRanges = document.querySelectorAll(".rdrInputRanges");
      inputRanges.forEach((inputRange) => {
        const spans = inputRange.querySelectorAll("span");
        spans.forEach((span) => {
          const value = span.textContent;
          const translatedValue =
            typeof value === "string"
              ? `${t(value.replace(/\s/g, "").toLowerCase())}`
              : "";
          span.textContent = translatedValue;
        });
      });

      const labelElements = document.querySelectorAll(".rdrStaticRangeLabel");
      labelElements.forEach((element) => {
        const value = element.textContent;

        const translatedValue =
          typeof value === "string"
            ? `${t(value.replace(/\s/g, "").toLowerCase())}`
            : "";
        element.textContent = translatedValue;
      });
    }
  }, [runTranslation, t]);
}

export default useTranslateCalendar;
