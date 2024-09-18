import { Col, Row } from "react-bootstrap";
import styled from "styled-components";

type TNetrumStyledImg = {
  imgwidth?: string;
  imgheight?: string;
  objectFit?: string;
};

type TLoadingContainer = {
  height?: string;
};
type TStyledColumn = {
  pointerEvents?: string;
};

type TDragComponent = {
  width: string;
  paddingTop: string;
  height: string;
  borderWidth: string;
  margin: string;
  position?: string;
  id?: string;
  display?: string;
};
type TDragMoveDiv = {
  opacity: number;
  transform: string;
  transition: string;
};
interface RosiComponentProps {
  isDragging: boolean;
}
const inputStyle = {
  backgroundColor: "var(--riskonboarding-input-bg-color)",
  color: "var(--riskonboarding-input-font-color)",
};

export const Overlapstyles = {
  // Fixes the overlapping problem of the component
  control: (baseStyles: any, state: any) => ({
    ...baseStyles,
    ...inputStyle,
    textAlign: "left",
    borderRadius: "30px !important",
    border: "1px solid var(--font-color)",
  }),
  valueContainer: (baseStyles: any, state: any) => ({
    ...baseStyles,
    height: "2.25rem",
    textAlign: "left",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "0.5rem",
      height: "0.5rem",
      zIndex: 2,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "var(--entityonboarding-text-color)",
      borderRadius: "0.25rem",
    },
  }),
  menuList: (provided: any) => ({
    ...provided,
    width: "100%",
    textAlign: "left",
    borderRadius: "10px !important",
    "&::-webkit-scrollbar": {
      width: "0.5rem",
      height: "0.5rem",
      zIndex: 2,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "var(--entityonboarding-text-color)",
      borderRadius: "0.25rem",
    },
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    zIndex: 2,
    width: "100%",
    ...inputStyle,
    textAlign: "left",
    border: "1px solid var(--font-color)",
    borderRadius: "10px !important",
  }),
  input: (baseStyles: any, state: any) => ({
    ...baseStyles,
    color: state.itemScope
      ? "var(--entityonboarding-text-color)"
      : "var(--entityonboarding-text-color)",
  }),
  singleValue: (provided: any, state: any) => ({
    ...provided,
    ...inputStyle,
  }),
  multiValue: (provided: any, state: any) => ({
    ...provided,
    fontSize: "0.65rem",
  }),
  option: (baseStyles: any, state: any) => ({
    ...baseStyles,
    width: "fit-content",
    color: state.isSelected
      ? "var(--bg-color)"
      : state.isFocused
      ? "var(--bg-color)"
      : "var(--entityonboarding-text-color)",
  }),
};

// Fixes the overlapping problem of the component

export const theme = (theme: any) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "var(--entityonboarding-text-color)",
    primary: "var(--entityonboarding-text-color)",
  },
});

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .bgImg {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
`;

export const NetrumLogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  top: 0;
  left: 0;
  position: absolute;
  margin: 1.5625rem;
  flex-direction: column;
`;

export const RightsLogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  bottom: 0;
  left: 0;
  position: absolute;
  margin: 1.5625rem;
  flex-direction: column;
`;

export const CustomCardContainer = styled.div`
  top: 0;
  position: absolute;
  color: white;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  flex-direction: column;
  flex: 1;
`;

export const CustomCard = styled.div`
  display: flex;
  justify-content: center;

  border-radius: 1.25rem;
  background: rgba(0, 0, 0, 0.8);
  max-width: 32.375rem;
  height: 29.6875rem;
  flex-direction: column;
  padding: 2rem;
  margin: 1rem;
`;
export const CustomHeading = styled.h1`
  font-size: 2rem;
  margin: 25px;
`;

export const LoadingContainer = styled.div<TLoadingContainer>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: ${(props) => props.height || "80vh"};
`;
export const DateRangeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const NetrumStyledImg = styled.img<TNetrumStyledImg>`
  height: ${(props) => props.imgheight};
  width: ${(props) => props.imgwidth};
  object-fit: ${(props) => props.objectFit};
`;

export const StyledErrorTag = styled.p`
  color: red;
`;

export const StyledColumn = styled(Col)<TStyledColumn>`
  padding: 5px;
  pointer-events: ${(props) => props.pointerEvents};
`;

export const AddEditPerspectiveColumn = styled(Col)`
  width: 100%;
  @media screen and (min-width: 600px) {
    width: 14.5rem;
  }
`;

export const GeneralDashboardContainerMain = styled.div`
  height: 100%;
  min-height: 40rem;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;
export const OEIPageRow = styled(Row)`
  height: 100%;
  min-height: 40rem;
`;

export const DragComponent = styled.div<TDragComponent>`
  width: ${(props) => props.width};
  padding-top: ${(props) => props.paddingTop};
  height: ${(props) => props.height};
  border-width: ${(props) => props.borderWidth};
  margin: ${(props) => props.margin};
  position: ${(props) => props.position};
  display: ${(props) => props.display};
`;

export const DragMoveDiv = styled.div<TDragMoveDiv>`
  opacity: ${(props) => props.opacity};
  transform: ${(props) => props.transform};
  transition: ${(props) => props.transition};
`;

export const DragMoveAbsoluteDiv = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;
export const DragInsightDiv = styled.div`
  position: absolute;
  top: 0;
  z-index: 1;
  height: 40px;
  width: 80%;
  cursor: move;
`;
export const DragOEIDiv = styled.div`
  position: absolute;
  background-color: transparent;
  height: 10%;
  width: 80%;
  z-index: 1;
  cursor: move;
`;
export const DragOEIHozDiv = styled.div`
  position: absolute;
  background-color: transparent;
  height: 10%;
  width: 60%;
  z-index: 1;
  cursor: move;
`;
export const DragRosiRiskDiv = styled.div`
  position: absolute;
  top: 0;
  z-index: 1;
  height: 40px;
  width: 80%;
  cursor: move;
`;

export const IncidentDetailsStyledIcon = styled.i`
  color: ${(props) => props.color};
`;

export const InsightPageGridCol = styled(Col)`
  padding: 0 0.3rem 0 0.25rem;
`;
export const RosiRiskDragComponent = styled.div<RosiComponentProps>`
  opacity: ${({ isDragging }) => (isDragging ? 1 : 1)};
  transform: ${({ isDragging }) => (isDragging ? "scale(1.05)" : "scale(1)")};
  transition: all 0.2s;
`;
export const RosiRiskDragItemContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;
