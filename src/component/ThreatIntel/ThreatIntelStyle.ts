import { Card, Col, Container } from "react-bootstrap";
import styled from "styled-components";

export const ThreatIntelStyleContainer = styled(Container)`
  padding: 5px;
`;
export const ThreatIntelStyleColumn = styled(Col)`
  padding: 5px;
  & > *:first-child {
    margin-left: auto;
  }
`;

export const ThreatIntelChartTitle = styled(Card.Title)`
  text-align: start;
  font-weight: 700;
  font-size: 0.85rem;
  font-family: "Poppins";
  line-height: 1.5rem;
  color: var(--dashboard-title-color);
  margin: 0.25rem 0.625rem;
`;
export const ThreatIntelChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const ThreatIntelChartButton = styled.button`
  padding: 0.25rem 0.5rem;
  background-color: var(--admin-card-bg-color);
  border: none;
  border-radius: 14px;
  cursor: pointer;
  color: var(--font-color);

  &:hover {
    background-color: var(--btn-hover-bg);
  }
`;

export const ChartLoadingContainer = styled.div`
  width: 95%;
  height: 85%;
`;
