import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";

type TMiniBoxBG = {
  bgColor: string;
  opacity: number;
};
type THeatMapNumberBox = {
  bgColor: string;
};

type THeatMapModalImpact = {
  color: string;
};

type THeatMapModalBodyListHeader = {
  textAlign: string;
};
type THeatMapModalBodyEntry = {
  textAlign: string;
};

export const RiskUserDashboardMainContainer = styled(Container)`
  border-radius: 1.25rem;
  background-color: var(--admin-card-bg-color);
`;

export const StyledRiskAggrContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0.25rem 0.5rem;
  flex-direction: column;
`;

export const StyledRiskAggrPieContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

export const StyledRiskAggrBarContainer = styled.div`
  // width: 28rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
`;

export const RiskJourneryButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 0.5em;
  margin-top: 0.15rem;
`;

export const RiskAggrTitleWithBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const RiskImpactChartTitle = styled.h6`
  color: var(--font-color);
  font-weight: 700;
  font-size: 0.85rem;
  font-family: Poppins;
`;
export const RUDRiskImpactColumn = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
  height: 17rem;
`;

export const HeatMapModalBody = styled.div`
  height: 100%;
  width: 100%;
  max-height: 20rem;
  overflow-y: auto;
  margin-top: 0.35rem;

  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--entityonboarding-text-color);
    border-radius: 0.25rem;
  }
`;

export const HeatmapHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const HeatmapHeaderHeading = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 800;
`;

export const HeatmapHeaderHeadingNumber = styled.div<THeatMapNumberBox>`
  background-color: ${(props) => props.bgColor};
  color: #000;
  width: 4rem;
  height: 2rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;

export const HeatMapModalBodyRow = styled(Row)`
  width: 100%;
  padding: 0.5rem 1.5rem;
  &:nth-of-type(even) {
    background-color: var(--perspective-head-color);
  }
`;
export const HeatMapModalBodyListRow = styled(Row)`
  width: 98.5%;
  padding: 0.5rem 1.5rem;
  border-bottom: 1px solid #d4d4d4;
`;
export const HeatMapModalBodyListHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.85rem;
`;
export const HeatMapModalBodyListHeader = styled.div<THeatMapModalBodyListHeader>`
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem 0;
  text-align: ${(props) => props.textAlign};
`;
export const HeatMapModalBodyEntry = styled.div<THeatMapModalBodyEntry>`
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.5rem 0;
  text-align: ${(props) => props.textAlign};
`;

export const MiniHeatMapContainer = styled.div`
  width: 100%;
  height: 6rem;
`;
export const HeatMapModalImpact = styled.b<THeatMapModalImpact>`
  color: ${(props) => props.color};
`;

// Define the Box component with styled-components
export const MiniBox = styled.div<TMiniBoxBG>`
  width: 100%;
  height: 1rem;
  background-color: ${(props) => props.bgColor};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 600;
  color: #000;
  opacity: ${(props) => props.opacity};
`;

// Define the Grid component
export const MiniMapGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 2px;
`;

export const HeatMapModalImpactContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeatMapModalDownloadDataIcon = styled.div`
  /* Add styles for pagination controls */

  display: flex;
  justify-content: end;
  align-items: center;
  margin: 0.5rem 0;
  width: 100%;
  gap: 0.5rem;

  button {
    padding: 0.25rem 0.5rem;
    background-color: var(--admin-card-bg-color);
    border: none;
    border-radius: 14px;
    cursor: pointer;
    color: var(--font-color);
  }

  button:hover {
    background-color: var(--btn-hover-bg);
  }

  button:disabled,
  button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
    color: whitesmoke;
  }
`;
