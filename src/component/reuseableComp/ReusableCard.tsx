import React, { ReactNode } from "react";

import styled from "styled-components";
export interface CardProps {
  children: ReactNode;
  height: number;
  width?: number;
  id?: string;
  borderLess?: boolean;
}
export interface StyledCardProps {
  height: number;
  width?: number;
  id?: string;
  borderLess?: boolean;
}
export const StyledCard = styled.div<StyledCardProps>`
  background-color: var(--bg-color);
  border-radius: 15px;
  /* padding: 5px; */
  /* margin: 5px; */
  border: ${(props) =>
    props.borderLess !== undefined
      ? props.borderLess === true
        ? "none"
        : "1px solid #4d4d4d"
      : "1px solid #4d4d4d"};
  height: ${(props) => props.height}rem;
  // width: ${(props) => props.width}rem;
  position: relative;
`;
export const StyledCardChildContainer = styled.div<StyledCardProps>`
  margin: 5px;
  height: ${(props) => props.height}rem;
  // width: ${(props) => props.width}rem;
  // width: 100%;
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
const ReusableCard: React.FC<CardProps> = ({
  children,
  height,
  width,
  id,
  borderLess,
}) => {
  return (
    <StyledCard height={height} width={width} id={id!} borderLess={borderLess}>
      <StyledCardChildContainer height={height - 0.5} width={width} id={id!}>
        {children}
      </StyledCardChildContainer>
    </StyledCard>
  );
};

export default ReusableCard;
