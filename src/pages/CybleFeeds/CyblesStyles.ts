import styled from "styled-components";

interface BoderBoxType {
  color: string | undefined;
}

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (min-width: 0px) and (max-width: 991px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
export const SubHeaderContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 0.5rem;
`;
export const TitleContainer = styled.h6`
  font-size: 1.25rem;
  margin: 1rem 0;
  text-align: left;
  @media screen and (min-width: 0px) and (max-width: 991px) {
    font-size: 1rem;
  }
`;
export const DateContainer = styled.h6`
  font-size: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.2rem;
`;
export const Dates = styled.span`
  font-size: 0.85rem;
`;

export const BoderBox = styled.div<BoderBoxType>`
  border: 2px solid ${(props) => props.color};
  padding: 0.25rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  color: ${(props) => props.color};
  @media screen and (min-width: 0px) and (max-width: 991px) {
    font-size: 0.65rem;
  }
`;

export const ContentContainer = styled.div`
  border: 2px solid #4d4d4d;
  border-left: none;
  border-right: none;
  padding: 0.25rem;

  margin: 1rem 0;
`;

export const DescriptionContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: start;
  flex-direction: column;
  margin: 0.25rem 0;
`;
export const SubTitles = styled.div`
  font-size: 0.95rem;
  font-weight: bolder;
  margin: 0.1rem 0;
`;

export const DesContent = styled.p`
  font-size: 0.75rem;
  text-align: left;
`;
