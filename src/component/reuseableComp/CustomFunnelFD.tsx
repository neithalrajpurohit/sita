import React, { useState } from "react";
import {
  FunnelBox,
  FunnelBoxText,
  FunnelBoxValue,
  FunnelContianer,
  IconContainer,
} from "./styles";
import { HiOutlineArrowDown } from "react-icons/hi2";
import formatNumber from "../../utils/NumberConverter";
import ReactTooltip from "react-tooltip";

export type FunnelBoxProps = {
  val: string;
  color: string;
};
type FDProps = {
  data: {
    value: number;
    color: string;
    text: string;
    hover: string;
  }[];
};

function getWidthByIndex(length: number, index: number) {
  const percentages = [100, 65, 42, 28, 20];
  const defaultPercentage = 10;

  if (index < percentages.length) {
    return `${percentages[index]}%`;
  } else if (index >= length) {
    return "0%";
  } else {
    return `${defaultPercentage}%`;
  }
}

function CustomFunelFD(props: FDProps) {
  const { data } = props;
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltipOnValue, setShowTooltipOnValue] = useState(false);

  const color = ["#DF2E2E", "#DF711B", "#FFB319", "#00A19D"];

  return (
    <FunnelContianer>
      {[
        ...data.map((rec, index) => {
          return {
            ...rec,
            color: color[index],
          };
        }),
      ].map((e, index) => {
        const val = getWidthByIndex(data.length, index);
        return (
          <React.Fragment key={index}>
            <FunnelBox val={val} color={e.color}>
              <FunnelBoxValue
                data-tip={String(e.value).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                data-for="React-tooltip"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                {formatNumber(e.value)}
              </FunnelBoxValue>
              <FunnelBoxText
                data-tip={e.hover}
                data-for="Funnel-Value"
                onMouseEnter={() => setShowTooltipOnValue(true)}
                onMouseLeave={() => setShowTooltipOnValue(false)}
              >
                {e.text}
              </FunnelBoxText>
            </FunnelBox>
            {index !== data.length - 1 && (
              <IconContainer>
                <HiOutlineArrowDown fontWeight="900" fontSize="1.6rem" />
              </IconContainer>
            )}
            {showTooltip && (
              <ReactTooltip
                id="React-tooltip"
                place="top"
                type="light"
                effect="float"
                border
                textColor="var(--entityonboarding-text-color)"
                backgroundColor="var(--admin-card-bg-color)"
                borderColor="var(--entityonboarding-text-color)"
                getContent={(dataTip) => dataTip}
              />
            )}
            {showTooltipOnValue && (
              <ReactTooltip
                id="Funnel-Value"
                place="top"
                type="light"
                effect="float"
                border
                className="funneltooltip"
                textColor="var(--entityonboarding-text-color)"
                backgroundColor="var(--admin-card-bg-color)"
                borderColor="var(--entityonboarding-text-color)"
                getContent={(dataTip) => dataTip}
              />
            )}
          </React.Fragment>
        );
      })}
    </FunnelContianer>
  );
}

export default CustomFunelFD;
