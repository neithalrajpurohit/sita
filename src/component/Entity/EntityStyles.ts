import { Col } from "react-bootstrap";
import styled from "styled-components";

export interface assetFillIndiProps {
  fillNumber: any;
  color: string;
  maxWidth: string;
}

interface assetGridHeaderItemProps {
  align: "center" | "left";
}
interface assetFillIndicatorTextProps {
  color: string;
}

type TListEntry = {
  color?: string;
};

type TFunctionListEntry = {
  background: string;
  color: string;
};

type TFunctionListEntrySub = TFunctionListEntry & {
  cursor?: string;
};

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
  @media screen and (min-width: 1701px) and (max-width: 7680px) {
    font-size: 0.8rem;
  }
`;

export const PageMiddleTitle = styled.h6`
  color: var(--entityonboarding-text-color);
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

export const FunctionContainer = styled.div`
  width: 100%;
  height: 130px;
  border-radius: 20px;
  border: 1px solid #d9d9d9;
  padding: 12px;
  background-color: var(--admin-card-bg-color);
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    height: 101px;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    height: 140px;
  }
  @media screen and (min-width: 1701px) and (max-width: 1919px) {
    height: 173px;
  }
  @media screen and (min-width: 1920px) and (max-width: 3839px) {
    height: 20.5vh;
  }
  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    height: 21.58vh;
  }
`;
export const TableContainer = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 20px;
  border: 1px solid #d9d9d9;
  padding: 12px;
  background-color: var(--admin-card-bg-color);
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    height: 190px;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    height: 40.95vh;
  }
  @media screen and (min-width: 1701px) and (max-width: 1919px) {
    height: 45vh;
  }
  @media screen and (min-width: 1920px) and (max-width: 3839px) {
    height: 45vh;
  }
  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    height: 48vh;
  }
`;

export const FunctionListContainer = styled.div`
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

export const FunctionListEntry = styled.div<TFunctionListEntry>`
  cursor: pointer;
  font-size: 0.8rem;
  padding: 2px;
  border-radius: 5px;
  text-align: start;
  background-color: ${(props) => props.background};
  color: ${(props) => props.color};
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    font-size: 0.7rem;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    font-size: 0.8rem;
  }
  @media screen and (min-width: 1701px) and (max-width: 3840px) {
    font-size: 0.8rem;
  }
`;

export const FunctionListEntrySub = styled.div<TFunctionListEntrySub>`
  text-align: start;
  width: 100%;
  font-size: 0.6rem;
  padding: 2px;
  border-radius: 5px;
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    font-size: 0.5rem;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    font-size: 0.6rem;
  }
  @media screen and (min-width: 1701px) and (max-width: 3840px) {
    font-size: 0.6rem;
  }
`;

export const ProcessContainer = styled.div`
  width: 100%;
  height: 130px;
  border-radius: 20px;
  border: 1px solid #d9d9d9;
  padding: 12px;
  background-color: var(--admin-card-bg-color);
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    height: 12.3vh;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    height: 13.2vh;
  }
  @media screen and (min-width: 1701px) and (max-width: 1919px) {
    height: 14.4vh;
  }
  @media screen and (min-width: 1920px) and (max-width: 3839px) {
    height: 14.1vh;
  }
  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    height: 14.55vh;
  }
`;

export const ProcessListContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
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

export const ProcessListEntry = styled.div<TFunctionListEntry>`
  cursor: pointer;
  font-size: 0.8rem;
  padding: 2px;
  border-radius: 5px;
  text-align: start;
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    font-size: 0.7rem;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    font-size: 0.8rem;
  }
  @media screen and (min-width: 1701px) and (max-width: 3840px) {
    font-size: 0.8rem;
  }
`;

export const BrandContainer2 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

export const ImageContainer2 = styled.div`
  margin: 0 10px 0 0;
  img {
    width: 3.125rem;
    height: 3.125rem;
    object-fit: contain;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 0.5em;
  margin: 20px 0 5px 0;
`;
export const ButtonContainer2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    font-size: 0.85rem;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    font-size: 1rem;
  }
  @media screen and (min-width: 1701px) and (max-width: 3840px) {
    font-size: 1.2rem;
  }
  a {
    color: inherit;
  }
`;
export const StyledSearchContainer = styled.div`
  border: 1px solid var(--table-search-border);
  border-radius: 5px;
  margin-right: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledSearchInput = styled.input`
  border: none !important;
  color: var(--font-color);
  width: 11.875rem;
  height: 1.5rem;
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

export const testtags =
  "Assests Name Already Added, Assests Name Already Added";

export const SampleCSVData = [
  [
    "Row",
    "Asset Name",
    "Function Name",
    "Office",
    "City",
    "State",
    "Country",
    "Asset Type",
    "Asset Category",
    "Asset Tags",
  ],
  [
    1,
    "Sample Assest Name",
    "Sample Function Name",
    "Existing Office",
    "Existing City",
    "Existing State",
    "Existing Country",
    "Sample Type",
    "Sample Category",
    testtags,
  ],
];

export const PageTitle = styled.h5`
  color: var(--entityonboarding-text-color);
  font-size: 1.25rem;
  font-weight: 700;
  text-transform: capitalize !important;
`;

export const BrandContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin: 10px 0;
`;

export const ImageContianer = styled.div`
  margin: 0 10px 0 0;
  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }
`;

export const CustomCardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: var(--admin-card-border);
  flex-direction: column;
  background-color: var(--admin-card-bg-color);
  border-radius: 15px;
  overflow: hidden;
  margin: 4px 0;
`;

export const CustomCardHeader = styled.div`
  text-align: start;
  width: 100%;
  padding: 10px 0 10px 10px;
  font-size: 0.85rem;
  color: var(--font-color);
  font-weight: 700;

  @media screen and (min-width: 991px) and (max-width: 1440px) {
    font-size: 0.85rem;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    font-size: 0.85rem;
  }
  @media screen and (min-width: 1701px) and (max-width: 3840px) {
    font-size: 0.85rem;
  }
`;

export const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
  max-height: 250px;
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    height: 265px;
    max-height: 265px;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    height: 388px;
    max-height: 388px;
  }
  @media screen and (min-width: 1701px) and (max-width: 1919px) {
    height: 505px;
    max-height: 505px;
  }
  @media screen and (min-width: 1920px) and (max-width: 3839px) {
    height: 52.5vh;
    max-height: none;
  }
  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    height: 56.5vh;
    max-height: none;
  }
`;

export const CustomCardBodyFunction = styled.div`
  width: 100%;
  height: 350px;
  border-radius: 20px;
  padding: 12px;
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    height: 110px;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    height: 170px;
  }
  @media screen and (min-width: 1701px) and (max-width: 1919px) {
    height: 225px;
  }
  @media screen and (min-width: 1920px) and (max-width: 3839px) {
    height: 20vh;
  }
  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    height: 22vh;
  }
`;
export const CustomCardBodyAssets = styled.div`
  width: 100%;
  height: 350px;
  border-radius: 20px;
  padding: 12px;
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    height: 110px;
  }
  @media screen and (min-width: 1441px) and (max-width: 1700px) {
    height: 170px;
  }
  @media screen and (min-width: 1701px) and (max-width: 1919px) {
    height: 225px;
  }
  @media screen and (min-width: 1920px) and (max-width: 3839px) {
    height: 27vh;
  }
  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    height: 30vh;
  }
`;

export const ListContainer = styled.div`
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

export const ListEntry = styled.div<TListEntry>`
  font-size: 0.8rem;
  padding: 2px;
  border-radius: 5px;
  text-align: start;
  color: ${(props) => props.color};
  @media screen and (min-width: 991px) and (max-width: 1700px) {
    font-size: 0.8rem;
  }
  @media screen and (min-width: 1701px) and (max-width: 3840px) {
    font-size: 1rem;
  }
`;
export const ListEntrySub = styled.div<TListEntry>`
  font-size: 0.8rem;
  padding: 2px;
  border-radius: 5px;
  text-align: start;
  color: ${(props) => props.color};
  @media screen and (min-width: 991px) and (max-width: 1700px) {
    font-size: 0.6rem;
  }
  @media screen and (min-width: 1701px) and (max-width: 3840px) {
    font-size: 0.9rem;
  }
`;

export const StyledTable = styled.table`
  caption-side: top;
  border: none;
  border-collapse: collapse;
  width: 100%;
  caption-side: bottom;
  thead {
    background-color: var(--admin-card-bg-color);
    position: sticky;
    top: 0; /* Don't forget this, required for the stickiness */
  }
  td,
  th {
    border: none;
    padding: 0.2rem;
    font-size: 0.8rem;
    text-align: start;
    @media screen and (min-width: 991px) and (max-width: 1440px) {
      font-size: 0.7rem;
    }
    @media screen and (min-width: 1441px) and (max-width: 1700px) {
      font-size: 0.8rem;
    }
    @media screen and (min-width: 1701px) and (max-width: 3840px) {
      font-size: 1rem;
    }
  }
  caption {
    font-size: 0.9em;
    padding: 5px;
    font-weight: bold;
  }
`;

export const AssetSummaryBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 1.25rem;
  border: 1px solid #d9d9d9;
  padding: 0.75rem 1rem;
  background-color: var(--admin-card-bg-color);
  flex-direction: column;
`;

export const AssetSummaryBoxBody = styled.div`
  width: 100%;
  height: 100%;
  min-height: 27rem;
  max-height: 27rem;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--entityonboarding-text-color);
    border-radius: 0.25rem;
  }
`;

export const AssetGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem 1rem;
  width: 100%;
`;

export const AssetGridHeaderItem = styled.div<assetGridHeaderItemProps>`
  /* Add your styling for grid items here */
  font-weight: 700;
  text-align: ${(props) => props.align};
`;
export const AssetGridItem = styled.div<assetGridHeaderItemProps>`
  /* Add your styling for grid items here */
  text-align: ${(props) => props.align};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const AssetFillIndicator = styled.div<assetFillIndiProps>`
  flex: 1;
  position: relative;
  max-width: ${(props) => props.maxWidth};
  height: 0.85rem;
  border-radius: 0.85rem;
  background-color: #eee;
  cursor: default;
  text-align: center;
  ::before {
    content: "${(props) => props.fillNumber}%";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: ${(props) => props.fillNumber}%;
    background-color: ${(props) => props.color};
    border-radius: 0.85rem;
    font-size: 0px; // to hide inner text
  }
`;

export const AssetFillIndicatorText = styled.p<assetFillIndicatorTextProps>`
  color: ${(props) => props.color};
  font-size: 0.75rem;
  font-weight: 900;
  padding: 0;
  margin: 0;
`;
export const AssetFillIndicatorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.25rem;
  margin: 0 0.85rem;
`;

export const EntityReviewColumn = styled(Col)`
  padding-left: 12px;
  padding-right: 12px;
`;
