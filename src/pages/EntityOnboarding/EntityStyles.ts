import styled from "styled-components";

type TMainContent = {
  paddingBottom?: string;
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

export const MainContent = styled.div<TMainContent>`
  flex: 1;
  padding-bottom: ${(props) => props.paddingBottom || "30px"};
`;

export const PageTitle = styled.h5`
  color: var(--entityonboarding-text-color);
  font-weight: 700;
  font-size: 1.25rem;
  padding: 0;
  margin: 0;
  text-transform: capitalize !important;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 1em;
  margin-bottom: 5px;
`;
