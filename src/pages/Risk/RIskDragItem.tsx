import React, { useEffect } from "react";
import { getResponsiveStyle, useDrag, useRefresh } from "muuri-react";
import { useMediaQuery } from "react-responsive";
import {
  AssetCollectionType,
  AssetInventoryType,
  RiskGaugesType,
} from "./RiskPageTypes";
import { DragComponent, DragMoveAbsoluteDiv } from "../GlobalStyles";

interface RiskDragItemProps {
  id: string;
  title: string;
  position: number;
  hidden: boolean;
  Element: any;
  reset: boolean;
  assetInventoryTreeFilter: AssetInventoryType;
  handleFilterChange: (
    filterIndex: number,
    optionIndex: number,
    updatedCheckedValue: boolean
  ) => void;
  toggleFilterCollapse: (filterIndex: number, isCollapsed: boolean) => void;
  overAllRiskGauge: {
    inherentRisk: number;
    residualRisk: number;
  };
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  assetsCollectionData: AssetCollectionType;
  toggleAllAssetSelection: (isChecked: boolean) => void;
  filteredassetsCollectionData: AssetCollectionType;
  handleAssetCollectionSelection: (id: number, checked: boolean) => void;
  riskGauges: RiskGaugesType;
}

const RiskDragItem = ({
  Element,
  hidden,
  id,
  position,
  title,
  assetInventoryTreeFilter,
  assetsCollectionData,
  filteredassetsCollectionData,
  handleAssetCollectionSelection,
  handleFilterChange,
  handleSearch,
  overAllRiskGauge,
  riskGauges,
  searchQuery,
  setSearchQuery,
  toggleAllAssetSelection,
  toggleFilterCollapse,
  reset,
}: RiskDragItemProps) => {
  const refresh = useRefresh();
  // const isDragging = useDrag();

  useEffect(() => {
    setTimeout(() => {
      refresh();
    }, 900);
  }, []);

  useEffect(() => {
    refresh();
  }, [hidden, reset]);

  const isMobile = useMediaQuery({
    query: "(max-width: 968px)",
  });

  const responsiveStyle = getResponsiveStyle({
    // We have configured Muuri component  to have virtually divided into 3 columns,
    // the width of the item will be 1 columns (minus the margin).
    columns: isMobile ? 1 / 1 : 1 / 3,
    // The margin of the item, it can be any CSS values
    // valid for the margin expressed in "px" or "%".
    // margin: "1%",
    margin: "4px 2px",
    // The width/height ratio. If you want to set a static
    // height just set the "height" option in px and remove the "ratio".
    ratio: isMobile ? 5 : 4.1,
    // height: "21.5rem",
  });

  // let width:any= "risk-gauge" ? "0.66%":
  let height: any = "21.5rem";

  //   if (
  //     id === "assets_inventory_tree" ||
  //     id === "risk_impact" ||
  //     id === "inherent_residual"
  //   ) {
  //     height = "18rem";
  //   } else {
  //     height = "21.5rem";
  //   }

  if (!isMobile) {
    return (
      <DragComponent
        className={hidden ? "d-none" : "d-block"}
        position={"relative"}
        borderWidth={responsiveStyle.borderWidth}
        width={id === "risk_gauge" ? "65.4%" : "32.5%"}
        height={height}
        margin={responsiveStyle.margin}
        paddingTop={responsiveStyle.paddingTop}
      >
        <DragMoveAbsoluteDiv>
          <Element
            assetInventoryTreeFilter={assetInventoryTreeFilter}
            handleFilterChange={handleFilterChange}
            toggleFilterCollapse={toggleFilterCollapse}
            overAllRiskGauge={overAllRiskGauge}
            handleSearch={handleSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            assetsCollectionData={assetsCollectionData}
            toggleAllAssetSelection={toggleAllAssetSelection}
            filteredassetsCollectionData={filteredassetsCollectionData}
            handleAssetCollectionSelection={handleAssetCollectionSelection}
            riskGauges={riskGauges}
          />
        </DragMoveAbsoluteDiv>
      </DragComponent>
    );
  }

  return (
    <DragComponent
      className={hidden ? "d-none" : "d-block"}
      borderWidth={responsiveStyle.borderWidth}
      width={responsiveStyle.width}
      height={id === "risk_gauge" ? "48%" : height}
      margin={responsiveStyle.margin}
      paddingTop={responsiveStyle.paddingTop}
    >
      <DragMoveAbsoluteDiv>
        <Element
          assetInventoryTreeFilter={assetInventoryTreeFilter}
          handleFilterChange={handleFilterChange}
          toggleFilterCollapse={toggleFilterCollapse}
          overAllRiskGauge={overAllRiskGauge}
          handleSearch={handleSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          assetsCollectionData={assetsCollectionData}
          toggleAllAssetSelection={toggleAllAssetSelection}
          filteredassetsCollectionData={filteredassetsCollectionData}
          handleAssetCollectionSelection={handleAssetCollectionSelection}
          riskGauges={riskGauges}
        />
      </DragMoveAbsoluteDiv>
    </DragComponent>
  );
};

export default RiskDragItem;
