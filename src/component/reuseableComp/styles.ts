import styled, { keyframes } from "styled-components";
import { FunnelBoxProps } from "./CustomFunnelFD";
import {
  fillIndiProps,
  BoxProps,
  fillIndiTitleProps,
} from "./FillIndicatorTypes";
import { StyledCardProps } from "./ReusableCard";

type TStyledFillIndicatorContainer = {
  margin: string;
  gap: string;
};

type TNoDataAvailableContainer = {
  height?: string;
  width?: string;
};

// Define the funnel box animation
const breathOut = keyframes`
  0% {
    transform: scale(0.75);
  }
  100% {
    transform: scale(1);
  }
`;
// Define the funnel arrows animation
const showIcons = keyframes`
  0% {
    transform: scale(0.75);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const FunnelContianer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
  margin-bottom: 5px;
  /* @media screen and (min-width: 424px) and (max-width: 1023px) {
  height: 85%;
} */
`;

export const FunnelBox = styled.div<FunnelBoxProps>`
  background: ${(props) => props.color};
  width: ${(props) => props.val};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 5rem;
  clip-path: polygon(0 0, 100% 0, 85% 100%, 15% 100%);
  animation: ${breathOut} 0.95s ease-in;
  -webkit-box-shadow: var(--funnel-box-shadow);
  -moz-box-shadow: var(--funnel-box-shadow);
  box-shadow: var(--funnel-box-shadow);
`;

export const FunnelBoxValue = styled.h4`
  margin: 0.325rem 0;
  font-size: 1.1rem;
  color: #000;
  font-weight: 800;
  cursor: default;
`;
export const FunnelBoxText = styled.p`
  margin: 0 0.325rem;
  padding: 0 0.325rem;
  font-size: 0.5rem;
  word-break: break-all;
  color: #000;
  font-weight: 600;
  max-width: 70%;
`;

export const IconContainer = styled.div`
  width: 35px;
  height: 35px;
  border: 2px solid black;
  border-radius: 35px;
  /* margin: -7px 0; */
  background-color: #fff;
  /* z-index: 1; */
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-weight: bolder;
  animation: ${showIcons} 0.95s ease-in;
`;
export const StyledHeading = styled.p`
  font-size: 0.85rem;
  font-weight: bold;
  margin: 0.15em 0 0 0.5em;
`;

export const IndicatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`;

export const IndiTitle = styled.h3<fillIndiTitleProps>`
  margin: 5px 0;
  display: flex;
  font-size: ${(props) => (props.type === 1 ? "1rem" : "0.8rem")};
  font-weight: 600;
`;

export const MinMaxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  font-weight: 700;
  width: 100%;
  span {
    font-size: 0.5rem;
  }
`;

export const FillIndicator = styled.div<fillIndiProps>`
  flex: 1;
  position: relative;
  width: 100%;
  height: ${(props) => (props.height !== undefined ? props.height : 0.85)}rem;
  border-radius: ${(props) =>
    props.height !== undefined ? props.height : 0.85}rem;
  background-color: ${(props) =>
    props.type === 1 ? "#eee" : "rgba(255, 255, 255, 0.06)"};
  text-align: end;
  cursor: ${(props) => (props.type === 1 ? "default" : "pointer")};
  text-align: left;
  ::before {
    content: "${(props) => props.fillNumber}%";
    position: absolute;
    font-weight: 400;
    top: 0;
    left: 0;
    bottom: 0;
    width: ${(props) => props.fillNumber}%;
    background-color: ${(props) => props.color};
    border-radius: ${(props) =>
      props.height !== undefined ? props.height : 0.85}rem;
    color: var(--font-color);
    font-size: ${(props) => (props.height !== undefined ? "0em" : "0rem")};
  }
`;

export const BarContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;
export const EventContainer = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
`;

export const IconContainer1 = styled.div`
  margin: 0px 5px;
  display: flex;
  align-items: center;
`;
export const BoxContainer = styled.div<BoxProps>`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: ${(props) => props.opacity}; /* set initial opacity to 0.5 */

  &:hover {
    opacity: 1; /* change opacity to 1 on hover */
  }
`;

export const StyledCard = styled.div<StyledCardProps>`
  background-color: transparent;
  border-radius: 15px;
  padding: 5px;
  margin: 5px;
  border: 1px solid #4d4d4d;
  height: ${(props) => props.height}rem;
`;
export const StyledCardChildContainer = styled.div<StyledCardProps>`
  margin: 5px;
  height: ${(props) => props.height}rem;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--entityonboarding-text-color);
    border-radius: 0.25rem;
  }
`;

export const StyledFillIndicatorContainer = styled.div<TStyledFillIndicatorContainer>`
  margin: ${(props) => props.margin};
  gap: ${(props) => props.gap};
  display: grid;
`;

export const NoDataAvailableContainer = styled.div<TNoDataAvailableContainer>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin: 0 0.5em;
  height: ${(props) => props.height || "100%"};
  width: ${(props) => props.width || "100%"};
`;
