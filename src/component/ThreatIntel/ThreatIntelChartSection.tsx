import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../configureStore";
import { ThreatIntelStyleColumn } from "./ThreatIntelStyle";
import ReusableCard from "../reuseableComp/ReusableCard";
import {
  attackSurface,
  brandIntelligence,
  cyberCrime,
  darkWeb,
} from "./ThreatIntelContants";
import ThreatIntelChartContainer from "./ThreatIntelChartContainer";
import { AppDispatch } from "../../index";
import { useDispatch } from "react-redux";
import { ThreatIntelStoreActionCreator } from "../../store/ThreatIntel/ThreatIntelSlice";

function usePieBarToggle(
  type: "attack_surface" | "cyber_crime" | "dark_web" | "brand_intelligence"
): [() => void] {
  const dispatch: AppDispatch = useDispatch();

  const currentActiveChartObj = useSelector(
    (state: RootState) => state.ThreatIntel.currentActiveCharts
  );

  const toggle = async () => {
    if (currentActiveChartObj[type] === "pie") {
      dispatch(
        ThreatIntelStoreActionCreator.UpdateCurrentActiveCharts({
          ...currentActiveChartObj,
          [type]: "bar",
        })
      );
    } else {
      dispatch(
        ThreatIntelStoreActionCreator.UpdateCurrentActiveCharts({
          ...currentActiveChartObj,
          [type]: "pie",
        })
      );
    }
  };

  return [toggle];
}

const ThreatIntelChartSection = () => {
  const allowedSubscription = useSelector(
    (state: RootState) => state.ThreatIntel.subscribedModules
  );

  const currentActiveChartObj = useSelector(
    (state: RootState) => state.ThreatIntel.currentActiveCharts
  );

  // Getting Data For All The Pie Charts From Redux
  const attackSurfacePieChartData = useSelector(
    (state: RootState) => state.ThreatIntel.attackSurfacePieChart
  );
  const brandIntelligencePieChartData = useSelector(
    (state: RootState) => state.ThreatIntel.brandIntelligencePieChart
  );
  const cyberCrimePieChartData = useSelector(
    (state: RootState) => state.ThreatIntel.cyberCrimePieChart
  );
  const darkWebPieChartData = useSelector(
    (state: RootState) => state.ThreatIntel.darkWebPieChart
  );

  // Getting Data For All The Bar Charts From Redux
  const attackSurfaceBarChartData = useSelector(
    (state: RootState) => state.ThreatIntel.attackSurfaceBarChart
  );
  const brandIntelligenceBarChartData = useSelector(
    (state: RootState) => state.ThreatIntel.brandIntelligenceBarChart
  );
  const cyberCrimeBarChartData = useSelector(
    (state: RootState) => state.ThreatIntel.cyberCrimeBarChart
  );
  const darkWebBarChartData = useSelector(
    (state: RootState) => state.ThreatIntel.darkWebBarChart
  );

  const [toggleAttackSurface] = usePieBarToggle(attackSurface);
  const [toggleBrandIntelligence] = usePieBarToggle(brandIntelligence);
  const [toggleDarkWeb] = usePieBarToggle(darkWeb);
  const [toggleCyberCrime] = usePieBarToggle(cyberCrime);

  const dynamicColumns = () => {
    switch (allowedSubscription.length) {
      case 4 || 2:
        return [6, 6, 6, 6];
      case 3:
        return [6, 6, 12, 12];
      case 1:
        return [12, 12, 12, 12];
      default:
        return [6, 6, 6, 6];
    }
  };
  const colVal = dynamicColumns();

  const getDynamicChart = (chartType: string, val: number) => {
    switch (chartType) {
      case attackSurface:
        return (
          <ThreatIntelStyleColumn xs={12} lg={colVal[val]}>
            <ReusableCard height={18}>
              <ThreatIntelChartContainer
                currentActive={currentActiveChartObj[attackSurface]}
                toggleCharts={toggleAttackSurface}
                pieChartData={attackSurfacePieChartData}
                barChartData={attackSurfaceBarChartData}
              />
            </ReusableCard>
          </ThreatIntelStyleColumn>
        );
      case brandIntelligence:
        return (
          <ThreatIntelStyleColumn xs={12} lg={colVal[val]}>
            <ReusableCard height={18}>
              <ThreatIntelChartContainer
                currentActive={currentActiveChartObj[brandIntelligence]}
                toggleCharts={toggleBrandIntelligence}
                pieChartData={brandIntelligencePieChartData}
                barChartData={brandIntelligenceBarChartData}
              />
            </ReusableCard>
          </ThreatIntelStyleColumn>
        );
      case cyberCrime:
        return (
          <ThreatIntelStyleColumn xs={12} lg={colVal[val]}>
            <ReusableCard height={18}>
              <ThreatIntelChartContainer
                currentActive={currentActiveChartObj[cyberCrime]}
                toggleCharts={toggleCyberCrime}
                pieChartData={cyberCrimePieChartData}
                barChartData={cyberCrimeBarChartData}
              />
            </ReusableCard>
          </ThreatIntelStyleColumn>
        );
      case darkWeb:
        return (
          <ThreatIntelStyleColumn xs={12} lg={colVal[val]}>
            <ReusableCard height={18}>
              <ThreatIntelChartContainer
                currentActive={currentActiveChartObj[darkWeb]}
                toggleCharts={toggleDarkWeb}
                pieChartData={darkWebPieChartData}
                barChartData={darkWebBarChartData}
              />
            </ReusableCard>
          </ThreatIntelStyleColumn>
        );
      default:
        return <></>;
    }
  };

  return (
    <Row lg={12} className="g-0">
      {allowedSubscription.map((chartType, index) => {
        return getDynamicChart(chartType, index);
      })}
    </Row>
  );
};

export default ThreatIntelChartSection;
