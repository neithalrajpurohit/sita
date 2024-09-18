import { RootState } from "../configureStore";
import { useSelector } from "react-redux";
import { useState } from "react";

export function useThemeVal(pos: String) {
    const themeValue = useSelector(
        (state: RootState) =>
            state.UserAuthentication.userDetails?.user?.theme_preference
    );

    switch (pos) {
        case "geometry":
            return themeValue === "dark" ? "#ECEDFF" : "#2982CC";
        case "water":
            return themeValue === "dark" ? "#000000" : "#EAEBFF";
        case "fontColor":
            return themeValue === "dark" ? "#ffffff" : "#000000";
        case "canvasbackgroundcolor":
            return themeValue === "dark" ? "transparent" : "#ffffff";
        case "doughnuttext":
            return themeValue === "dark" ? "#ffffff" : "#404040";
        case "variant":
            return themeValue;
        case "darklogo":
            return themeValue === "dark" ? "darkLogo" : "logo";
        case "gridlines":
            return themeValue === "dark" ? "#8D8D8D63" : "#7070704D";
        default:
            return themeValue;
    }
}
