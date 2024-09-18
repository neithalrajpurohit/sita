import { Form } from "react-bootstrap";
import styled from "styled-components";

type TRiskCustomToggleLabel = {
  bold: number;
};

export const RiskCustomToggleContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 0.5rem;
`;

export const RiskCustomToggleLabel = styled(Form.Label)<TRiskCustomToggleLabel>`
  font-weight: ${(props) => props.bold};
  font-size: 0.85rem;
  font-family: "Poppins";
`;

export const RiskAllCostLabel = styled.p`
  font-size: 0.68rem;
  font-family: "Poppins";
`;
