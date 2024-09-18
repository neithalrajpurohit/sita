import { Card } from "react-bootstrap";
import styled from "styled-components";

type TPreFunctionListEntry = {
  background: string;
  color: string;
};
type TProcessListEntry = {
  background?: string;
  color?: string;
};

type TAdminInfoCardTitle = {
  fontSize: string;
  lineHeight: string;
};
type TAdminInfoCardSubTitle = {
  fontSize: string;
};

export const ButtonContainer2 = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 0.5em;
  margin: 20px 0 5px 0;
  content: "";
`;

export const BoxTitle = styled.h6`
  color: var(--entityonboarding-text-color);
  font-size: 0.9rem;
  margin: 0.85rem 0;
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    font-size: 0.75rem;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    font-size: 0.9rem;
  }
  @media screen and (min-width: 1701px) and (max-width: 1919px) {
    font-size: 1rem;
  }
  @media screen and (min-width: 1920px) and (max-width: 3839px) {
    font-size: 1rem;
  }
  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    font-size: 1rem;
  }
`;

export const FunctionContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 20px;
  border: 1px solid #d9d9d9;
  padding: 12px;
  background-color: var(--admin-card-bg-color);
  @media screen and (min-width: 320px) and (max-width: 1200px) {
    height: 385px;
  }
  @media screen and (min-width: 1201px) and (max-width: 1440px) {
    height: 370px;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    height: 450px;
  }
  @media screen and (min-width: 1701px) and (max-width: 1919px) {
    height: 500px;
  }
  @media screen and (min-width: 1920px) and (max-width: 3839px) {
    height: 60.2vh;
  }
  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    height: 62.5vh;
  }
`;

export const FunctionListEntry = styled.div`
  /* padding: 10px 0 0 10px; */
  overflow: hidden;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 2px;
  border-radius: 5px;
  text-align: start;
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    font-size: 0.7rem;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    font-size: 0.8rem;
  }
  @media screen and (min-width: 1701px) and (max-width: 3840px) {
    font-size: 1rem;
  }
`;
export const FunctionListEntrySub = styled.div`
  /* padding: 10px 0 0 10px; */

  font-size: 0.6rem;
  padding: 2px;
  border-radius: 5px;
  text-align: start;
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    font-size: 0.5rem;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    font-size: 0.6rem;
  }
  @media screen and (min-width: 1701px) and (max-width: 3840px) {
    font-size: 0.9rem;
  }
`;

export const PreFunctionContainer = styled.div`
  width: 100%;
  height: 150px;
  border-radius: 20px;
  border: 1px solid #d9d9d9;
  padding: 12px;
  background-color: var(--admin-card-bg-color);
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    height: 120px;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    height: 157px;
  }
  @media screen and (min-width: 1701px) and (max-width: 1919px) {
    height: 170px;
  }
  @media screen and (min-width: 1920px) and (max-width: 3839px) {
    height: 20.8vh;
  }
  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    height: 22vh;
  }
`;

export const PreFunctionListContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--entityonboarding-text-color);
    border-radius: 0.25rem;
  }
`;

export const inputStyle = {
  backgroundColor: "var(--riskonboarding-input-bg-color)",
  color: "var(--riskonboarding-input-font-color)",
};

export const PageContainer = styled.div`
  background-color: var(--entityonboarding-bg-color);
  color: var(--entityonboarding-text-color);
  width: 100%;
  height: 100%;
  display: flex;
  /* justify-content: center;
  align-items: center; */
  flex: 1;
  flex-direction: column;
`;

export const MainContent = styled.div`
  flex: 1;
  padding-bottom: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 1em;
  margin-bottom: 5px;
`;
export const ButtonContainer1 = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 0.5em;
  margin: 20px 0 5px 0;
`;
export const FunctionContainer2 = styled.div`
  width: 100%;
  border-radius: 20px;
  border: 1px solid #d9d9d9;
  padding: 12px;
  background-color: var(--admin-card-bg-color);
  @media screen and (min-width: 320px) and (max-width: 1200px) {
    height: 385px;
  }
  @media screen and (min-width: 1201px) and (max-width: 1440px) {
    height: 370px;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    height: 435px;
  }
  @media screen and (min-width: 1701px) and (max-width: 1919px) {
    height: 500px;
  }
  @media screen and (min-width: 1920px) and (max-width: 3839px) {
    height: 60.2vh;
  }
  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    height: 62.5vh;
  }
`;

export const FunctionListContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--entityonboarding-text-color);
    border-radius: 0.25rem;
  }
`;

export const PreFunctionContainerSmall = styled.div`
  width: 100%;
  height: 100px;
  border-radius: 20px;
  border: 1px solid #d9d9d9;
  padding: 12px;
  background-color: var(--admin-card-bg-color);
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    height: 120px;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    height: 150px;
  }
  @media screen and (min-width: 1701px) and (max-width: 1919px) {
    height: 170px;
  }
  @media screen and (min-width: 1920px) and (max-width: 3839px) {
    height: 20.8vh;
  }
  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    height: 22vh;
  }
`;

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
  height: 100%;
  background-color: var(--admin-card-bg-color);
  color: var(--entityonboarding-text-color);
  border-radius: 10px;
  box-shadow: var(--admin-card-boxshadow);
  border: var(--admin-card-border);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0 10px;
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

export const ColorDot = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
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

export const PageMiddleTitle = styled.h6`
  color: var(--entityonboarding-text-color);
  font-size: 0.9rem;
  margin: 0.5rem 0;
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    font-size: 0.75rem;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    font-size: 0.9rem;
  }
  @media screen and (min-width: 1701px) and (max-width: 1919px) {
    font-size: 1rem;
  }
  @media screen and (min-width: 1920px) and (max-width: 3839px) {
    font-size: 1rem;
  }
  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    font-size: 1rem;
  }
`;

export const StyledTable = styled.table`
  caption-side: top;
  border: none;
  border-collapse: collapse;
  width: 100%;

  caption-side: bottom;

  thead {
    background-color: var(--admin-card-bg-color);
    position: sticky;
    top: 0; /* Don't forget this, required for the stickiness */
  }

  td,
  th {
    border: none;
    padding: 0.2rem;
    font-size: 0.8rem;
    text-align: start;
    @media screen and (min-width: 991px) and (max-width: 1440px) {
      font-size: 0.7rem;
    }
    @media screen and (min-width: 1441px) and (max-width: 1700px) {
      font-size: 0.8rem;
    }
    @media screen and (min-width: 1701px) and (max-width: 3840px) {
      font-size: 0.8rem;
    }
  }

  caption {
    font-size: 0.9em;
    padding: 5px;
    font-weight: bold;
  }
`;

export const TableContainer = styled.div`
  width: 100%;
  height: 33rem;
  border-radius: 20px;
  border: 1px solid #d9d9d9;
  padding: 12px;
  background-color: var(--admin-card-bg-color);
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    height: 26rem;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    height: 33rem;
  }
  @media screen and (min-width: 1701px) and (max-width: 1919px) {
    height: 33rem;
  }
  @media screen and (min-width: 1920px) and (max-width: 3839px) {
    height: 33rem;
  }
  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    height: 33rem;
  }
`;
export const ProcessListEntry = styled.div<TProcessListEntry>`
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  cursor: pointer;
  font-size: 0.8rem;
  padding: 2px;
  border-radius: 5px;
  text-align: start;
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    font-size: 0.7rem;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    font-size: 0.8rem;
  }
  @media screen and (min-width: 1701px) and (max-width: 3840px) {
    font-size: 0.8rem;
  }
`;
export const ProcessListContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--entityonboarding-text-color);
    border-radius: 0.25rem;
  }
`;
export const ProcessContainer = styled.div`
  width: 100%;
  height: 6.85rem;
  border-radius: 1.25rem;
  border: 1px solid #d9d9d9;
  padding: 0.75rem;
  background-color: var(--admin-card-bg-color);
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    height: 5rem;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    height: 6.85rem;
  }
  @media screen and (min-width: 1701px) and (max-width: 1919px) {
    height: 6.85rem;
  }
  @media screen and (min-width: 1920px) and (max-width: 3839px) {
    height: 6.85rem;
  }
  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    height: 6.85rem;
  }
`;
export const PreFunctionListEntry = styled.div<TPreFunctionListEntry>`
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  cursor: pointer;
  font-size: 0.8rem;
  padding: 2px;
  border-radius: 5px;
  text-align: start;
  width: 99%;
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    font-size: 0.7rem;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    font-size: 0.8rem;
  }
  @media screen and (min-width: 1701px) and (max-width: 3840px) {
    font-size: 1rem;
  }
`;
export const FunctionContainer3 = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 20px;
  border: 1px solid #d9d9d9;
  padding: 12px;
  background-color: var(--admin-card-bg-color);
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    height: 255px;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    height: 280px;
  }
  @media screen and (min-width: 1701px) and (max-width: 1919px) {
    height: 320px;
  }
  @media screen and (min-width: 1920px) and (max-width: 3839px) {
    height: 38.5vh;
  }
  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    height: 38.5vh;
  }
`;
export const PreFunctionContainerSmall2 = styled.div`
  width: 100%;
  height: 100px;
  border-radius: 20px;
  border: 1px solid #d9d9d9;
  padding: 12px;
  background-color: var(--admin-card-bg-color);
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    height: 85px;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    height: 105px;
  }
  @media screen and (min-width: 1701px) and (max-width: 1919px) {
    height: 120px;
  }
  @media screen and (min-width: 1920px) and (max-width: 3839px) {
    height: 15.5vh;
  }
  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    height: 15.5vh;
  }
`;
export const FunctionListContainer1 = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--entityonboarding-text-color);
    border-radius: 0.25rem;
  }
`;

export const AdminInfoCardTitle = styled(Card.Title)<TAdminInfoCardTitle>`
  font-weight: 700;
  margin: 0.625rem;
  color: #2cba67;
  font-size: ${(props) => props.fontSize};
  line-height: ${(props) => props.lineHeight};
`;
export const AdminInfoCardSubTitle = styled(
  Card.Subtitle
)<TAdminInfoCardSubTitle>`
  font-weight: 500;
  margin: 0.625rem 0;
  color: var(--admin-subtitle-color);
  font-size: ${(props) => props.fontSize};
  line-height: 1rem;
  text-align: center;
  word-break: break-word;
`;
