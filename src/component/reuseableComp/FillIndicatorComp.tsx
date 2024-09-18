import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../configureStore";
import {
  BoxContainer,
  IconContainer1,
  IndicatorContainer,
  MinMaxContainer,
  BarContainer,
  EventContainer,
  IndiTitle,
  FillIndicator,
} from "./styles";
import { fillProps } from "./FillIndicatorTypes";
import { useTranslation } from "react-i18next";

function Emoji(value: any) {
  let emoji;

  if (value.value >= 80 && value.value <= 100) {
    emoji = "😊"; // happy emoji
  } else if (value.value >= 50 && value.value < 80) {
    emoji = "😕"; // little sad emoji
  } else {
    emoji = "😢"; // completely sad emoji
  }

  return <div>{emoji}</div>;
}

const FillIndicatorComp = ({
  fillNumber,
  color,
  title,
  icon,
  type,
  onClick,
  eventCount,
  height,
}: fillProps) => {
  const prFilters = useSelector(
    (state: RootState) => state.Insight.internalFilters
  ).map((g) => g.value);
  const { t } = useTranslation();

  return (
    <BoxContainer
      opacity={
        prFilters.length > 0 ? (prFilters.includes(title) ? 1 : 0.75) : 1
      }
    >
      <IconContainer1>{icon}</IconContainer1>
      <IndicatorContainer>
        <IndiTitle type={type}>
          {title}
          {type === 1 && <Emoji value={fillNumber} />}
        </IndiTitle>
        <BarContainer>
          <FillIndicator
            eventCount={eventCount}
            fillNumber={fillNumber}
            color={color}
            type={type}
            height={height}
            onClick={() => {
              onClick(title);
            }}
          />
          <EventContainer>
            {t("incidents")}: {eventCount} ({fillNumber} %)
          </EventContainer>
        </BarContainer>
        <MinMaxContainer>
          {type === 1 && (
            <>
              <span>0% </span>
              <span>100% </span>
            </>
          )}
        </MinMaxContainer>
      </IndicatorContainer>
    </BoxContainer>
  );
};

export default FillIndicatorComp;
