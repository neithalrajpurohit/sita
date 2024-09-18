import styled from "styled-components";

type TColorDot = {
  background: string;
};

export const StyledContainer = styled.div`
  background-color: var(--bg-color);
  color: var(--entityonboarding-text-color);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const BoxCard = styled.div`
  height: 99%;
  background-color: var(--admin-card-bg-color);
  color: var(--entityonboarding-text-color);
  border-radius: 10px;
  box-shadow: var(--admin-card-boxshadow);
  border: var(--admin-card-border);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const BoxHeader = styled.div`
  color: var(--entityonboarding-text-color);
  padding: 0 5px;
  font-weight: 700;
  margin: 15px;
  text-align: left;
  font-size: 1rem;
  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    font-size: 1rem;
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  border-bottom: 1px solid grey;
  width: 100%;
  padding: 15px 0px 15px 15px;
`;

export const ColorDot = styled.div<TColorDot>`
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
  background: ${(props) => props.background};
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 0.7rem;
  }
`;

export const ItemText = styled.div`
  text-align: center;
  padding: 0 5px;
  font-weight: 600;
  font-size: 1.1rem;
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    font-size: 0.8rem;
  }
  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    font-size: 1rem;
  }
`;
