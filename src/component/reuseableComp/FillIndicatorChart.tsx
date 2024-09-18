import React from "react";
import FillIndicatorComp from "./FillIndicatorComp";
import styled from "styled-components";
import { AppDispatch } from "../../index";
import { useDispatch } from "react-redux";
import { InsightStoreNewActionCreator } from "../../store/Insights/InsightSlice";
import { TFillIndicatorChartProps } from "./FillIndicatorTypes";
import { StyledFillIndicatorContainer, StyledHeading } from "./styles";
import { chartIds } from "../../pages/Insights/InsightPage";
import { useTranslation } from "react-i18next";
import NoDataAvailable from "./NoDataAvailable";

const FillIndicatorChart = (props: TFillIndicatorChartProps) => {
  const { title, data, id } = props;
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();

  const onFunctionClick = (props: string) => {
    let sendfilter;
    if (id === chartIds.ALERT_TYPE) {
      sendfilter = [{ key: "alert_type", value: props }];
      dispatch(InsightStoreNewActionCreator.UpdatedInternalFilters(sendfilter));
    } else {
      sendfilter = [{ key: "asset_name", value: props }];
      dispatch(InsightStoreNewActionCreator.UpdatedInternalFilters(sendfilter));
    }
  };

  return (
    <>
      {data.length > 0 ? (
        <>
          <StyledHeading>{title}</StyledHeading>
          <StyledFillIndicatorContainer
            id={props.id}
            margin={id === chartIds.ALERT_TYPE ? "0.1em 0.4em" : "0.6em"}
            gap={id === chartIds.ALERT_TYPE ? "0.1em" : "0.12em"}
          >
            {data.map((e, index) => (
              <div key={index} id={props.id}>
                <FillIndicatorComp
                  fillNumber={e.val}
                  color={e.color}
                  title={e.title}
                  type={2}
                  eventCount={e.eventCount}
                  onClick={onFunctionClick}
                  height={id === chartIds.ALERT_TYPE ? undefined : 1.35}
                />
              </div>
            ))}
          </StyledFillIndicatorContainer>
        </>
      ) : (
        <NoDataAvailable width="96%" />
      )}
    </>
  );
};

export default FillIndicatorChart;
