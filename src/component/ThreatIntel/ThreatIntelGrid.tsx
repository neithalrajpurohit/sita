import { useSelector } from "react-redux";
import { RootState } from "../../configureStore";
import AADGrid from "../AutomaticAssetDiscovery/AADGrid";
import ReusableCard from "../reuseableComp/ReusableCard";
import { ThreatIntelStyleContainer } from "./ThreatIntelStyle";
import { orderBy } from "lodash";

const ThreatIntelGrid = () => {
  const threatIntelState = useSelector((state: RootState) => state.ThreatIntel);
  const onRowOneClicked = (row: any) => {
    window.open("https://etek.cyble.ai/", "_blank");
  };

  return (
    <ThreatIntelStyleContainer fluid>
      <ReusableCard height={35}>
        <AADGrid
          showPrevBtn={false}
          itemsPerPage={12}
          gridData={orderBy(
            threatIntelState.grid.gridData,
            ["column2"],
            ["desc"]
          )}
          gridHeader={threatIntelState.grid.gridHeader}
          handleColumn1Click={onRowOneClicked}
        />
      </ReusableCard>
    </ThreatIntelStyleContainer>
  );
};

export default ThreatIntelGrid;
