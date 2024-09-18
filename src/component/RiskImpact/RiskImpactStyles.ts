import { Container, Form } from "react-bootstrap";
import styled from "styled-components";

type TDataCardBody = {
  height: string;
};
type TRiskStyledTableReviewTd = {
  opacity: number;
};
type TRiskStyledTableReviewTableRow = {
  borderTop?: string;
  borderBottom?: string;
  borderLeft?: string;
  borderRight?: string;
};

type TStyledRguContainer = {
  backgroundColor: string;
  color: string;
};

export const MainContainer = styled(Container)`
  border-radius: 1.25rem;
  border: 1px solid #d9d9d9;
  background-color: var(--admin-card-bg-color);
  padding: 0.75rem 1rem;
`;

export const DataCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 1.25rem;
  border: 1px solid #d9d9d9;
  padding: 0.5rem;
  background-color: var(--admin-card-bg-color);
  flex-direction: column;
`;
export const DataCardMiddleTitle = styled.h6`
  color: var(--entityonboarding-text-color);
  margin: 5px 0;
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
export const DataCardBody = styled.div<TDataCardBody>`
  width: 100%;
  height: 100%;
  min-height: ${(props) => props.height};
  max-height: ${(props) => props.height};
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

export const StyledCircle = styled.div`
  content: "";
  width: 0.75rem !important;
  height: 0.75rem !important;
  border-radius: 50%;
  transform: scale(0.75);
  aspect-ratio: 1;
`;
export const StyledBookMark = styled.div`
  content: "";
  width: 1.5rem !important;
  height: 0.85rem !important;
  margin-left: -1rem;
  background-color: var(--font-color);
  border: 1px solid var(--font-color);
  aspect-ratio: 1;
`;

export const StyledRguContainer = styled.div<TStyledRguContainer>`
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  gap: 0.25rem;
  padding: 0.25rem 1rem;
  cursor: pointer;
  border-radius: 0.25rem;
  width: 100%;
  flex-direction: row;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
`;

export const StyledFunctionContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: start;
  gap: 0.5rem;
  padding: 0.25rem 1rem;
  margin: 0.75rem 0;
  border-radius: 0.25rem;
  text-align: start;
`;
export const StyledFunctionButton = styled.div`
  height: 1.25rem;
  width: 1rem;
  background-color: #c4c4c4;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0.25rem 1rem;
  border-radius: 0.25rem;
`;

export const StyledTableContainer = styled.div`
  width: 100%;
  height: 100%;
  max-height: 33rem;
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

export const StyledTable = styled.table`
  caption-side: top;
  border: none;
  border-collapse: collapse;
  width: 99.5%;
  caption-side: bottom;

  thead {
    background-color: var(--perspective-head-color);
    position: sticky;
    top: 0; /* Don't forget this, required for the stickiness */
  }

  td,
  th {
    border: none;
    padding: 0.5rem;
    @media screen and (min-width: 424px) and (max-width: 1023px) {
      font-size: 0.5rem;
    }
    @media screen and (min-width: 1024px) and (max-width: 1440px) {
      font-size: 0.55rem;
    }
    @media screen and (min-width: 1441px) and (max-width: 1700px) {
      font-size: 0.8rem;
    }
    @media screen and (min-width: 1701px) and (max-width: 1920px) {
      font-size: 0.8rem;
    }
    @media screen and (min-width: 1921px) and (max-width: 2560px) {
      font-size: 0.8rem;
    }
    @media screen and (min-width: 2561px) and (max-width: 3840px) {
      font-size: 0.8rem;
    }
  }

  tbody tr {
    :nth-of-type(even) {
      background-color: var(--perspective-head-color);
    }
  }

  .special_td {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.25rem;
  }

  caption {
    font-size: 0.9em;
    padding: 5px;
    font-weight: bold;
  }
`;

export const StyledRiskImpactTd = styled.td<TRiskStyledTableReviewTd>`
  opacity: ${(props) => props.opacity};
`;

export const StyledRiskImpactTableRow = styled.tr<TRiskStyledTableReviewTableRow>`
  border-top: ${(props) => props.borderTop};
  border-bottom: ${(props) => props.borderBottom};
  border-left: ${(props) => props.borderLeft};
  border-right: ${(props) => props.borderRight};
`;

export const RGUTableContainer = styled.div`
  width: 100%;
  height: 29rem;
  border-radius: 20px;
  border: 1px solid #d9d9d9;
  padding: 12px;
  background-color: var(--admin-card-bg-color);
`;

export const RGUTableBodyContainer = styled.div`
  width: 100%;
  height: 100%;
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

export const RGUTableStyledCheckBox = styled(Form.Check)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RguGridStyledTableData = styled.td`
  max-width: 12rem !important;
`;

export const RguGridTable = styled.table`
  caption-side: top;
  border: none;
  border-collapse: collapse;
  width: 99.75%;
  caption-side: bottom;

  thead {
    background-color: var(--perspective-head-color);
    position: sticky;
    top: 0; /* Don't forget this, required for the stickiness */
    z-index: 3;
  }

  .borderRight {
    border-right: 1px solid var(--font-color);
  }

  .count {
    font-size: 0.6rem;
    max-width: 4em;
    text-align: center;
    font-weight: 600;
    word-break: normal;
  }
  .rotate {
    font-size: 0.6rem;
    max-width: 7em;
    min-width: 7em;
    text-align: center;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .rotate:hover {
    font-size: 0.65rem;
    cursor: zoom-in;
    max-width: 15rem;
    /* min-width: 7em; */
    font-weight: 800;
    white-space: break-spaces;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .rguNameContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 0.25rem;
  }

  td,
  th {
    border: none;
    padding: 0.25rem;
    @media screen and (min-width: 424px) and (max-width: 1023px) {
      font-size: 0.5rem;
    }
    @media screen and (min-width: 1024px) and (max-width: 1440px) {
      font-size: 0.55rem;
    }
    @media screen and (min-width: 1441px) and (max-width: 1700px) {
      font-size: 0.8rem;
    }
    @media screen and (min-width: 1701px) and (max-width: 1920px) {
      font-size: 0.8rem;
    }
    @media screen and (min-width: 1921px) and (max-width: 2560px) {
      font-size: 0.8rem;
    }
    @media screen and (min-width: 2561px) and (max-width: 3840px) {
      font-size: 0.8rem;
    }
  }

  tbody tr {
    :nth-of-type(even) {
      background-color: var(--perspective-head-color);
    }
  }

  .special_td {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.25rem;
  }

  caption {
    font-size: 0.9em;
    padding: 5px;
    font-weight: bold;
  }
`;
