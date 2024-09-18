import styled from "styled-components";

type TEmailDiv = {
  background: string;
  color: string;
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
  padding-bottom: 30px;
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
  gap: 1em;
  flex: 0.1;
  margin-bottom: 0.5rem;
`;
export const PageTitle = styled.h5`
  color: var(--entityonboarding-text-color);
  font-size: 1.01rem;
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    font-size: 1rem;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    font-size: 1.01rem;
  }
  @media screen and (min-width: 1701px) and (max-width: 1919px) {
    font-size: 1.1rem;
  }
  @media screen and (min-width: 1920px) and (max-width: 3839px) {
    font-size: 1.1rem;
  }
  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    font-size: 1.1rem;
  }
`;

export const StyledSearchContainer = styled.div`
  border: 1px solid var(--table-search-border);
  margin-right: 25px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledSearchInput = styled.input`
  border: none !important;
  color: var(--font-color);
  width: 11.875rem;
  height: 2.2em;
  background: transparent;
  border-radius: 5px;
  font-size: 1rem;
  margin-left: 4px;
  outline: none;
  &:active {
    border: none !important;
    outline: none;
  }
  &:focus {
    border: none !important;
    outline: none;
  }
  @media screen and (min-width: 300px) and (max-width: 480px) {
    width: 6em;
  }
`;

export const StyledTable = styled.table`
  caption-side: top;
  border: hidden;
  width: 100%;

  thead,
  tbody {
    border: 1px solid var(--font-color);
  }
  tr {
    cursor: pointer;
    color: var(--font-color);
    line-height: 1.5rem;
    text-align: right;
  }

  thead {
    background-color: var(--admin-card-bg-color);
    position: sticky;
    top: 0; /* Don't forget this, required for the stickiness */
    color: var(--table-heading-color);
    border-bottom: 1.5px solid var(--grid-head-border-bottom);
  }

  td,
  th {
    padding: 0.2rem;
    font-size: 1rem;
    text-align: start;
    @media screen and (min-width: 991px) and (max-width: 1440px) {
      font-size: 1rem;
    }
    @media screen and (min-width: 1441px) and (max-width: 1700px) {
      font-size: 1.1rem;
    }
    @media screen and (min-width: 1701px) and (max-width: 3840px) {
      font-size: 1.2rem;
    }
  }

  caption {
    font-size: 0.9em;
    padding: 5px;
    font-weight: bold;
  }
`;

export const ProcessListContainer = styled.div`
  height: 25rem;
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

export const RiskPageTitle = styled.h5`
  color: var(--entityonboarding-text-color);
  font-size: 1.1rem;
  padding: 0;
  margin: 0;
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    font-size: 1rem;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    font-size: 1.1rem;
  }
  @media screen and (min-width: 1701px) and (max-width: 3839px) {
    font-size: 1.25rem;
  }
  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    font-size: 1.25rem;
  }
`;

export const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1em;
  margin: 10px 0px;
`;
export const PageSelectContainer = styled.div`
  width: 10rem;
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    width: 12rem;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    width: 16rem;
  }
  @media screen and (min-width: 1701px) and (max-width: 3839px) {
    width: 22rem;
  }
  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    width: 22rem;
  }
`;
export const QuestionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
  margin: 0.5rem;
`;
export const QuestionTextContainer = styled.div`
  width: 70%;
  flex: 1;
  text-align: start;
`;

export const IconsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: end;
  gap: 1em;
  flex: 0.02;
  height: 100%;
  width: 100%;
  /* flex-direction: column; */
`;
export const RiskButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 1em;
  flex: 0.1;
  margin-bottom: 0.5rem;
`;
export const AddButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1em;
  flex: 0.1;
`;

export const ParaStyled = styled.p`
  height: 4rem;
  padding: 1rem;
  margin: 0;
  word-wrap: break-word;
  overflow-y: auto;
  text-align: left;
  font-size: 0.5rem;
  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--entityonboarding-text-color);
    border-radius: 0.25rem;
  }

  @media screen and (min-width: 0px) and (max-width: 990px) {
    font-size: 0.6rem;
    padding: 0.1rem;
  }
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    font-size: 0.7rem;
    padding: 0.25rem;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    font-size: 0.8rem;
    padding: 1rem;
  }
  @media screen and (min-width: 1701px) and (max-width: 3840px) {
    font-size: 1rem;
  }
`;
export const OptionsContainerForModal = styled.p`
  max-height: 20rem;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--entityonboarding-text-color);
    border-radius: 0.25rem;
  }
`;

export const QuestionSpan = styled.span`
  word-wrap: break-word;
  font-weight: bolder;
`;
export const ModalContainerResponsive = styled.div`
  width: auto;
  height: 100%;
`;

export const CustomText = styled.p`
  margin: 0;
  font-size: 0.5rem;
  @media screen and (min-width: 0px) and (max-width: 990px) {
    font-size: 0.5rem;
  }
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    font-size: 0.7rem;
    padding: 0.25rem;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    font-size: 0.8rem;
    padding: 1rem;
  }
  @media screen and (min-width: 1701px) and (max-width: 3840px) {
    font-size: 1rem;
  }
`;

export const PageTitle1 = styled.h5`
  color: var(--entityonboarding-text-color);
  font-size: 1.1rem;
  padding: 0;
  margin: 0;
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    font-size: 1rem;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    font-size: 1.1rem;
  }
  @media screen and (min-width: 1701px) and (max-width: 3839px) {
    font-size: 1.25rem;
  }
  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    font-size: 1.25rem;
  }
`;

export const EmailItemContainer = styled.div`
  max-height: 5rem;
  /* width: 28rem; */
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--entityonboarding-text-color);
    border-radius: 0.25rem;
  }
`;

export const RiskModleButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const EmailDiv = styled.div<TEmailDiv>`
  cursor: pointer;
  font-size: 0.85rem;
  padding: 0 0.5rem;
  background: ${(props) => props.background};
  color: ${(props) => props.color};
`;
