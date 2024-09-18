import { useCallback } from "react";
import useWindowSize from "./useWindowSize";

type Breakpoint = [
  { name: "xs"; width: 0 },
  { name: "sm"; width: 576 },
  { name: "md"; width: 768 },
  { name: "lg"; width: 992 },
  { name: "xl"; width: 1200 },
  { name: "xxl"; width: 1400 }
];

const breakpoints: Breakpoint = [
  { name: "xs", width: 0 },
  { name: "sm", width: 576 },
  { name: "md", width: 768 },
  { name: "lg", width: 992 },
  { name: "xl", width: 1200 },
  { name: "xxl", width: 1400 },
];

type ResponsiveValues = {
  [key in Breakpoint[number]["name"]]?: any;
};

export const useBreakpoints = () => {
  const { width } = useWindowSize();

  const breakpointChangeHandler = useCallback(
    <T extends ResponsiveValues>(
      responsiveValues: T
    ): T[keyof T] | undefined => {
      const breakpoint = breakpoints.reduce((prev, curr) => {
        if (width >= curr.width && curr.name in responsiveValues) {
          return curr;
        }
        return prev;
      }, breakpoints[0]);
      return responsiveValues[breakpoint?.name || "xs"];
    },
    [width]
  );

  return breakpointChangeHandler;
};
