import { useMemo } from "react";
import { mapRange } from "../utils/mapRange";
import useWindowDimensions from "./useWindowDimension";

type OptionsType = {
  baseWidth?: number;
  baseFontSize?: number;
  multiplier?: number;
};

export const useScreenWidthFontSize = (options?: OptionsType) => {
  const { width } = useWindowDimensions();

  const _options = {
    baseWidth: 1536,
    baseFontSize: 16,
    multiplier: 1,
    ...(options ? options : {}),
  };
  return useMemo(() => {
    const temp = mapRange(
      width,
      _options.baseWidth,
      _options.baseWidth * 10,
      _options.baseFontSize,
      _options.baseFontSize * _options.multiplier * 10
    );
    return temp;
  }, [_options.baseFontSize, _options.baseWidth, _options.multiplier, width]);
};
