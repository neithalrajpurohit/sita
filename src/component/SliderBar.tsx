import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { Overlay, Tooltip } from "react-bootstrap";
import { Placement } from "react-bootstrap/esm/types";
import {
  SliderContainer,
  SliderHeading,
  StyledParentDiv,
} from "./GlobalComponentStyles";
interface SliderBarProps {
  BarTitle?: string;
  marks?: any;
  margin?: any;
  marginLeft?: any;
  marginRight?: any;
  marginTop?: any;
  marginBottom?: any;
  value?: number;
  onChange?: (value: number) => void;
  width?: any;
  background?: any;
  tooltipEnabled?: boolean;
}

// const customTooltip = (props:

const SliderBar = (props: SliderBarProps) => {
  const {
    BarTitle,
    marks,
    value,
    onChange,
    margin,
    marginLeft,
    marginRight,
    marginBottom,
    marginTop,
    width,
    tooltipEnabled = false,
  } = props;

  const sliderRef = useRef<HTMLDivElement>(null);
  const [tooltipTarget, setTooltipTarget] = useState<HTMLElement | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (!sliderRef.current) return;
    const sliderLabelsWrapper =
      sliderRef.current.querySelector(".rc-slider-mark");
    if (!sliderLabelsWrapper) return;
    const sliderLabelNodes = sliderLabelsWrapper.querySelectorAll(
      ".rc-slider-mark-text"
    );
    const events: Record<string, (e: any) => void> = {
      mouseenter: (e: any) => {
        setTooltipTarget(e.target);
        setShowTooltip(true);
      },
      mouseleave: () => {
        setShowTooltip(false);
      },
    };
    sliderLabelNodes.forEach((node) => {
      Object.keys(events).forEach((event) => {
        node.addEventListener(event, events[event]);
      });
    });
    return () => {
      sliderLabelNodes.forEach((node) => {
        Object.keys(events).forEach((event) => {
          node.removeEventListener(event, events[event]);
        });
      });
    };
  }, []);

  const [tooltiptText, tooltipPosition] = useMemo<[string, Placement]>(() => {
    if (!tooltipTarget) return ["", "top"];
    const hoveredLableText = tooltipTarget.innerText;
    const [markKey, markData]:
      | [string, { label: string; longLabel: string }]
      | [] =
      Object.entries(marks as Record<string, any>).find(
        ([, value]: [any, { label: string }]) =>
          value.label === hoveredLableText
      ) ?? [];

    return [
      markData?.longLabel ?? "",
      markKey && parseInt(markKey) === 100 ? "left" : "top",
    ];
  }, [marks, tooltipTarget]);

  return (
    <SliderContainer width={width}>
      {BarTitle !== undefined && <SliderHeading>{BarTitle}</SliderHeading>}

      <StyledParentDiv
        ref={sliderRef}
        marginRight={`${marginRight / 16}rem`}
        marginLeft={`${marginLeft / 16}rem`}
        marginTop={`${marginTop === undefined ? "2.5" : marginTop / 16}rem `}
        marginBottom={`${
          marginBottom === undefined ? "4.375" : marginBottom / 16
        }rem `}
      >
        <Slider
          dots
          min={0}
          marks={marks}
          {...(typeof value !== "undefined" && typeof onChange === "function"
            ? {
                value: value,
                onChange: (updateValue) => onChange(updateValue as number),
              }
            : {})}
          step={null}
          className="slider-color"
          defaultValue={0}
          trackStyle={[{ backgroundColor: "#1DBC36" }]}
          activeDotStyle={{
            backgroundColor: "#1DBC36",
            borderColor: "#1DBC36",
            backgroundImage: "handshake",
          }}
          handleStyle={{ backgroundColor: "#1DB836", borderColor: "#1DB836" }}
        />
      </StyledParentDiv>
      {tooltipEnabled && (
        <Overlay
          target={tooltipTarget}
          show={showTooltip}
          placement={tooltipPosition}
        >
          <Tooltip>{tooltiptText}</Tooltip>
        </Overlay>
      )}
    </SliderContainer>
  );
};

export default SliderBar;
