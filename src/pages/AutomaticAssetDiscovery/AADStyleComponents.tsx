import styled from "styled-components";

export const AADDataCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 1.25rem;
  border: 1px solid #d9d9d9;
  padding: 0.5rem;
  background-color: var(--admin-card-bg-color);
  flex-direction: column;
`;

export const AADDataCardBody = styled.div`
  width: 100%;
  height: 100%;
  min-height: 32rem;
  max-height: 32rem;
  overflow-y: auto;
  overflow-x: auto;
  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.1rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--entityonboarding-text-color);
    border-radius: 0.25rem;
  }
`;

export const SingleContent = styled.div`
  display: flex;
  justify-content: left;
  align-items: left;
  padding: 0.5rem;
  flex-direction: column;
`;
export const SingleContentLabel = styled.div`
  font-size: 1rem;
  font-weight: bold;
  padding: 0;
  margin-bottom: 0.2rem;
`;
export const SingleContentValue = styled.div`
  font-size: 0.85rem;
  font-weight: 400;
  padding: 0;
  margin-bottom: 0.2rem;
`;
