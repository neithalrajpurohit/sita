import { InputGroup } from "react-bootstrap";
import styled from "styled-components";

type TPreFunctionListEntry = {
  color: string;
  background?: string;
};

type TPreFunctionContainer = {
  opacity?: number;
  cursor?: string;
};

export const BoxTitle = styled.h6`
  color: var(--entityonboarding-text-color);
  font-size: 0.9rem;
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
    height: 324px;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    height: 400px;
  }
  @media screen and (min-width: 1701px) and (max-width: 1919px) {
    height: 588px;
  }
  @media screen and (min-width: 1920px) and (max-width: 3839px) {
    height: 59vh;
  }
  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    height: 60vh;
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

export const FunctionListEntry = styled.div<TPreFunctionListEntry>`
  color: ${(props) => props.color};
  background: ${(props) => props.background};
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
    font-size: 0.8rem;
  }
`;
export const FunctionListEntrySub = styled.div<TPreFunctionListEntry>`
  /* padding: 10px 0 0 10px; */
  color: ${(props) => props.color};
  background: ${(props) => props.background};
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
    font-size: 0.6rem;
  }
`;
export const PreFunctionContainer = styled.div<TPreFunctionContainer>`
  opacity: ${(props) => props.opacity};
  cursor: ${(props) => props.cursor};
  width: 100%;
  height: 150px;
  border-radius: 20px;
  border: 1px solid #d9d9d9;
  padding: 12px;
  background-color: var(--admin-card-bg-color);
  @media screen and (min-width: 1201px) and (max-width: 1440px) {
    height: 120px;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    height: 157px;
  }
  @media screen and (min-width: 1701px) and (max-width: 1919px) {
    height: 250px;
  }
  @media screen and (min-width: 1920px) and (max-width: 3839px) {
    height: 24vh;
  }
  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    height: 25vh;
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

export const PreFunctionListEntry = styled.div<TPreFunctionListEntry>`
  color: ${(props) => props.color};
  background: ${(props) => props.background};
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

export const ProcessListEntry = styled.div<TPreFunctionListEntry>`
  color: ${(props) => props.color};
  background: ${(props) => props.background};
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

export const StyledInputGroup = styled(InputGroup)<TPreFunctionContainer>`
  opacity: ${(props) => props.opacity};
  cursor: ${(props) => props.cursor};
`;
