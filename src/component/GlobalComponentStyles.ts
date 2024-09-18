import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { HiPlus } from "react-icons/hi2";
import styled from "styled-components";
import { RequiredFieldsProps } from "./RequiredFields";

type TLocationListEntry = {
  backgroundColor: string;
  color: string;
};
type TEntityAssetsTableRow = {
  background: string;
  color: string;
};

type TDashboardCardProps = {
  id: string | undefined;
};
type TStyledLogoImgNavBar = {
  width: string;
  showShadow: boolean;
};
type TStyledParentDiv = {
  height?: string;
  width?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
};

type TTextContainer = TLocationListEntry & {
  // Additional properties or methods for TTextContainer
  cursor: string;
};
type TStyledTable = {
  // Additional properties or methods for TTextContainer
  overflowY?: string;
};

type TStyledImgContainerDiv = {
  innerWidth: number;
  imgUrl: string;
};
type TUploadImgButton = {
  imgUrl: string;
};

type TSliderContainer = {
  width: any;
};

type TButtonContainer = {
  pointerEnvents?: string;
  opacity?: number;
};
type TDashboardOEICardTitle = {
  color: string;
};

export const inputStyle = {
  backgroundColor: "var(--card-bg-color)",
  color: "var(--font-color)",
};
export const RiskinputStyle = {
  backgroundColor: "var(--riskonboarding-input-bg-color)",
  color: "var(--riskonboarding-input-font-color)",
};

export const PageTitle = styled.h5`
  color: var(--entityonboarding-text-color);
  font-weight: 700;
  font-size: 1.25rem;
  padding: 0;
  margin: 0;
  text-transform: capitalize !important;
`;

export const PageMiddleTitle = styled.h6`
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

export const GoogleMapPageTitle = styled.h6`
  margin: 0.25rem 0.35rem;

  @media screen and (min-width: 991px) and (max-width: 1440px) {
    font-size: 0.75rem;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    font-size: 0.9rem;
  }
  @media screen and (min-width: 1701px) and (max-width: 1919px) {
    font-size: 0.9rem;
  }
  @media screen and (min-width: 1920px) and (max-width: 3839px) {
    font-size: 0.9rem;
  }
  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    font-size: 0.9rem;
  }
  color: var(--font-color);
  font-weight: 700;
  font-family: Poppins;
`;
export const PageTagline = styled.p`
  color: var(--entityonboarding-text-color);
  font-size: 0.7rem;
  margin-bottom: 10px;
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    font-size: 0.6rem;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    font-size: 0.7rem;
  }
  @media screen and (min-width: 1701px) and (max-width: 1919px) {
    font-size: 0.95rem;
  }
  @media screen and (min-width: 1920px) and (max-width: 3839px) {
    font-size: 0.95rem;
  }
  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    font-size: 0.95rem;
  }
`;
export const ImageTagline = styled.p`
  color: var(--entityonboarding-text-color);
  font-size: 0.5rem;
  margin-bottom: 10px;
  text-align: center;
  padding: 0px 9px;
  color: ${(props) => (props.color ? props.color : "")};
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    font-size: 0.4rem;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    font-size: 0.5rem;
  }
  @media screen and (min-width: 1701px) and (max-width: 1919px) {
    font-size: 0.6rem;
  }
  @media screen and (min-width: 1920px) and (max-width: 3839px) {
    font-size: 0.6rem;
  }
  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    font-size: 0.6rem;
  }
`;

export const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  max-height: 500px;
  max-width: 900px;
  @media screen and (min-width: 320px) and (max-width: 1200px) {
    margin-top: 25px;
  }
  @media screen and (min-width: 1201px) and (max-width: 1440px) {
    height: 400px;
    max-height: 500px;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    height: 500px;
    max-height: 600px;
  }
  @media screen and (min-width: 1701px) and (max-width: 1919px) {
    height: 575px;
    max-height: 700px;
  }
  @media screen and (min-width: 1920px) and (max-width: 3839px) {
    height: 72vh;
    max-height: none;
    max-width: none;
  }
  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    height: 75vh;
    max-height: none;
    max-width: none;
  }
`;

export const LocationContainer = styled.div`
  width: 100%;
  height: 113px;
  border-radius: 20px;
  border: 1px solid #d9d9d9;
  padding: 12px;
  background-color: var(--admin-card-bg-color);
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    height: 100px;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    height: 125px;
  }
  @media screen and (min-width: 1701px) and (max-width: 1919px) {
    height: 195px;
  }
  @media screen and (min-width: 1920px) and (max-width: 2560px) {
    height: 22vh;
  }
  @media screen and (min-width: 2561px) and (max-width: 7680px) {
    height: 25vh;
  }
`;

export const LocationListContainer = styled.div`
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

export const LocationListEntry = styled.div<TLocationListEntry>`
  cursor: pointer;
  font-size: 0.8rem;
  padding: 2px;
  border-radius: 5px;
  text-align: start;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    font-size: 0.7rem;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    font-size: 0.8rem;
  }
  @media screen and (min-width: 1701px) and (max-width: 1919px) {
    font-size: 0.8rem;
  }
  @media screen and (min-width: 1920px) and (max-width: 3839px) {
    font-size: 0.8rem;
  }
  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    font-size: 0.8rem;
  }
`;

export const ButtonContainer = styled.div<TButtonContainer>`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 0.5em;
  margin: 20px 0 5px 0;
  pointer-events: ${(props) => props.pointerEnvents};
  opacity: ${(props) => props.opacity};
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const FunctionContainer = styled.div`
  width: 100%;
  height: 100%;
  /* border-radius: 20px; */
  /* border: 1px solid #d9d9d9; */
  padding: 0.2rem 0.75rem;
  /* background-color: var(--admin-card-bg-color); */
`;

export const FunctionListContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: auto;
  position: relative;

  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--entityonboarding-text-color);
    border-radius: 0.25rem;
  }
`;

export const StyledTable = styled.table<TStyledTable>`
  caption-side: top;

  border: none;
  border-collapse: collapse;
  width: 99%;
  overflow-y: ${(props) => props.overflowY};

  thead {
    background-color: var(--perspective-head-color);
    position: sticky;
    top: 0; /* Don't forget this, required for the stickiness */
    z-index: 3;
  }

  td,
  th {
    border: none;
    padding: 0.2rem;
    white-space: nowrap;
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

  caption {
    font-size: 0.9em;
    padding: 5px;
    font-weight: bold;
  }

  .dashboardRowCursor {
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

export const EntityAssetsTableRow = styled.tr<TEntityAssetsTableRow>`
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  cursor: pointer;
  z-index: -2;
`;

export const BarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  /* margin: 5px 0; */
  border-radius: 40px;
  height: 2.5em;
  overflow: hidden;

  @media screen and (min-width: 424px) and (max-width: 1023px) {
    height: 2.5em;
  }
  @media screen and (min-width: 1024px) and (max-width: 1440px) {
    height: 2.5em;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    height: 2.5em;
  }
  @media screen and (min-width: 1701px) and (max-width: 1920px) {
    height: 2.6em;
  }
`;

export const TextContainer = styled.div<TTextContainer>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  cursor: ${(props) => props.cursor};
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
`;

export const TabText = styled.div`
  font-size: 0.7rem;
  text-align: center;
  font-weight: 700;
  /* margin: 10px; */
  line-height: 20px;
`;

export const CustomSelectStyles = {
  // Fixes the overlapping problem of the component
  control: (baseStyles: any, state: any) => ({
    ...baseStyles,
    ...RiskinputStyle,
    textAlign: "left",
    borderRadius: "30px !important",
    border: "1px solid var(--font-color)",
  }),
  menuList: (provided: any) => ({
    ...provided,
    borderRadius: "10px !important",
    border: "1px solid var(--font-color)",
    "&::-webkit-scrollbar": {
      width: "0.5rem",
      height: "0.5rem",
      zIndex: 4,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "var(--entityonboarding-text-color)",
      borderRadius: "0.25rem",
    },
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    zIndex: 4,
    ...RiskinputStyle,
  }),
  input: (baseStyles: any, state: any) => ({
    ...baseStyles,
    color: state.itemScope
      ? "var(--entityonboarding-text-color)"
      : "var(--entityonboarding-text-color)",
  }),
  singleValue: (provided: any, state: any) => ({
    ...provided,
    ...RiskinputStyle,
  }),
  option: (baseStyles: any, state: any) => ({
    ...baseStyles,
    color: state.isSelected
      ? "var(--bg-color)"
      : state.isFocused
      ? "var(--bg-color)"
      : "var(--entityonboarding-text-color)",
  }),
};

export const StyledColumn = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

export const RiskChartTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
export const RiskChartValueContainer = styled.span`
  font-size: 0.8rem;
  font-weight: bold;
  padding: 0;
  margin: 0;
  width: 100%;
  text-align: left;
  color: ${(props) => props.color};
  @media screen and (min-width: 426px) and (max-width: 1199px) {
    font-size: 0.5rem;
  }
  @media screen and (min-width: 1200px) and (max-width: 1440px) {
    font-size: 0.6rem;
  }
`;

export const ActiveDirectoryStyledDiv = styled.div`
  background-color: var(--active-directory-card-bg-bolor);
  border-radius: 2.5rem;
  justify-content: space-between;
  border: 2px solid var(--active-directory-card-border);
`;
export const ActiveDirectoryStyledHeading = styled.h1`
  font-size: 0.825rem;
  font-weight: 600;
  margin-top: 2.5rem;
  color: var(--riskonboarding-body-text-color);
  padding: 0.625rem;
  overflow-wrap: break-word;
`;
export const ActiveDirectoryStyledCol = styled(Col)`
  color: var(--active-directory-card-bg-bolor);
`;

export const CompanyLogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const CompanyLogoCard = styled(Card)`
  justify-content: center;
  align-items: center;
  height: 7em;
  padding: 9px;
  border-radius: 20px;
  background-color: var(--formbar-bg-inactive-color);
  color: var(--formbar-default-text-color);
  cursor: pointer;
`;
export const CompanyLogoInput = styled.input`
  display: none;
`;

export const CompanyLogoCardBody = styled(Card.Body)`
  font-family: "Poppins";
  font-size: 1rem;
  font-weight: 400;
`;
export const CompanyLogoCardHiPlusIcon = styled(HiPlus)`
  width: 3rem;
  height: 3rem;
`;

export const EnitityAddUpdateButton = styled(Button)`
  border-radius: 0 10px 10px 0;
  border: 0.15rem solid #198754;
  width: 5rem;
  background: transparent;
  color: var(--entityonboarding-button-text-color);
  font-size: 0.5rem;
  font-weight: 600;
`;

export const SecurityPulseMarqueeItem = styled.span`
  margin: 0 25px;
  font-size: 1rem;
  white-space: nowrap;
`;

export const StyledDashboardCard = styled(Card)<TDashboardCardProps>`
  width: auto;
  border-radius: 15px;
  background-color: var(--bg-color);
  border: 1px solid #4d4d4d;
  height: 100%;
`;
export const StyledDashboardCardTiTle = styled(Card.Title)`
  text-align: start;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: move;
  font-family: "Poppins";
  line-height: 1.5rem;
  color: var(--dashboard-title-color);
  margin: 0.25rem 0.625rem;
`;
export const StyledDashboardCardBody = styled(Card.Body)`
  padding: 5px;
`;

export const StyledLogoImgNavBar = styled.img<TStyledLogoImgNavBar>`
  width: ${(props) => props.width};
  object-fit: contain;
  filter: ${(props) =>
    props.showShadow ? "drop-shadow(0.25rem 0.25rem 0.25rem #000)" : null};
`;

export const RequiredFeildStart = styled.span<RequiredFieldsProps>`
  position: absolute;
  top: -2px;
  right: ${(props) => props?.right || "0.9375rem"};
  font-weight: 600;
  font-size: 1.12rem;
  line-height: 140%;
  color: #f11919;
  z-index: 2;
`;

export const StyledParentDiv = styled.div<TStyledParentDiv>`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  padding-top: ${(props) => props.paddingTop || "0px"};
  padding-bottom: ${(props) => props.paddingBottom || "0px"};
  padding-right: ${(props) => props.paddingRight || "0px"};
  padding-left: ${(props) => props.paddingLeft || "0px"};
  margin-top: ${(props) => props.marginTop || "0px"};
  margin-bottom: ${(props) => props.marginBottom || "0px"};
  margin-right: ${(props) => props.marginRight || "0px"};
  margin-left: ${(props) => props.marginLeft || "0px"};
`;

export const StyledImgContainerDiv = styled.div<TStyledImgContainerDiv>`
  height: ${(props) => (props.innerWidth > 932 ? "300px" : "200px")};
  background-image: ${(props) => props.imgUrl};
  background-size: contain;
  background-repeat: no-repeat;
  object-fit: fill;
  background-position: center;
`;
export const UploadImgColumn = styled(Col)<TStyledImgContainerDiv>`
  height: ${(props) => (props.innerWidth > 932 ? "300px" : "200px")};
  background-image: ${(props) => props.imgUrl};
  background-size: contain;
  background-repeat: no-repeat;
  object-fit: contain;
  background-position: center;
  text-align: center;
`;

export const SliderContainer = styled.div<TSliderContainer>`
  border-radius: 1.875rem;
  font-family: Poppins !important;
  width: ${(props) => props.width};
`;
export const SliderHeading = styled.h1`
  font-size: 0.75rem !important;
  color: var(--riskonboarding-text-color) !important;
  font-weight: 600 !important;
  margin-top: 10px !important;
  margin-left: 0px !important;
`;

export const DashboardOEICardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  gap: 0.25rem;
`;
export const DashboardOEICard = styled(Card)`
  flex: 1 !important;
  justify-content: center !important;
  align-items: center !important;
  border: 0 !important;
  background-color: var(--bg-color) !important;
  width: auto !important;
  border-radius: 20px !important;
  cursor: auto !important;
`;
export const DashboardOEICardTitle = styled(Card.Title)<TDashboardOEICardTitle>`
  font-size: 3rem;
  font-weight: 700;
  margin: 0.625rem;
  line-height: 1.5rem;
  cursor: default;
  color: ${(props) => props.color};
`;
export const DashboardOEICardTitleSub = styled.sub<TDashboardOEICardTitle>`
  font-size: 0.6rem;
  font-weight: 700;
  line-height: 1.5rem;
  cursor: default;
  color: ${(props) => props.color};
`;

export const DashboardOEICardSubtitle = styled(Card.Subtitle)`
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.1875rem;
  margin: 0.25rem 0;
`;

export const DashboardOEICardDivider = styled.div`
  width: 100%;
  background-color: var(--card-border-color);
  padding: 1px;
`;

export const InsightShowShartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 97.75%;
`;

export const IncidentDetailsCardTitle = styled.h6<TDashboardOEICardTitle>`
  color: ${(props) => props.color};
`;

export const IncidentDetailsCard = styled(Card)<TDashboardOEICardTitle>`
  border-radius: 8px;
  width: 10.93rem;
  border-color: ${(props) => props.color};
  background-color: var(--bg-color);
`;
export const IncidentDetailsCardImg = styled(Card.Img)`
  width: 1.25rem;
`;
export const IncidentDetailsButton = styled(Button)`
  width: fit-content;
  height: 2.125rem;
  border-radius: 0.625rem;
`;
export const IncidentDetailsDescp = styled.p`
  font-size: 0.8rem;
`;

export const UploadImgButton = styled(Button)<TUploadImgButton>`
  background-size: contain;
  object-fit: contain;
  background-repeat: no-repeat;
  background-color: #fff;
  width: 100%;
  background-image: ${(props) => props.imgUrl};
`;

export const GeneralDashboardRow = styled(Row)`
  height: 15rem !important;
`;

export const RiskBugdetValue = styled.p`
  padding: 0;
  margin: 0;
  font-size: 1.25rem;
  font-weight: bold;
`;

export const SecurityBudgetInputH1 = styled.h1`
  font-size: 1rem;
  color: var(--riskdashboard-title-color);
  font-weight: 400;
  text-align: center;
  background-color: var(--riskonboarding-screeno-title-color);
  border-radius: 15px 15px 0px 0px;
  padding: 0.625rem;
  width: 100%;
  border: 1px solid var(--card-border-color);
`;
export const SecurityBudgetInputFormLabel = styled(Form.Label)`
  margin-left: 1rem;
  font-size: 0.6875rem;
  font-weight: 700;
`;
export const GoogleMapStyle = styled.div`
  height: 15.75rem;
  paddingtop: 5px;
`;
export const ModalCloseButton = styled.div`
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
