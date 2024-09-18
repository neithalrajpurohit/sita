import React from "react";
import { HiOutlineChartBar, HiOutlineChartPie } from "react-icons/hi2";
import {
  ChartLoadingContainer,
  ThreatIntelChartButton,
  ThreatIntelChartHeader,
  ThreatIntelChartTitle,
} from "./ThreatIntelStyle";
import {
  ThreatIntelBarCharts,
  ThreatIntelPieCharts,
} from "../../store/ThreatIntel/ThreatIntelType";
import ThreatIntelPieChart from "./ThreatIntelPieChart";
import ThreatIntelBarChart from "./ThreatIntelBarChart";

interface ThreatIntelChartContainerProps {
  currentActive: "pie" | "bar";
  toggleCharts: () => void;
  pieChartData: ThreatIntelPieCharts;
  barChartData: ThreatIntelBarCharts;
}

const ThreatIntelChartContainer: React.FC<ThreatIntelChartContainerProps> = ({
  currentActive,
  toggleCharts,
  pieChartData,
  barChartData,
}) => {
  return (
    <>
      <ThreatIntelChartHeader>
        {currentActive === "pie" ? (
          <ThreatIntelChartTitle>{pieChartData.title}</ThreatIntelChartTitle>
        ) : (
          <ThreatIntelChartTitle>{barChartData.title}</ThreatIntelChartTitle>
        )}

        <ThreatIntelChartButton onClick={toggleCharts}>
          {currentActive === "pie" ? (
            <HiOutlineChartBar
              fontSize="1.25rem"
              fontWeight="bold"
              color="inherent"
              cursor="pointer"
            />
          ) : (
            <HiOutlineChartPie
              fontSize="1.25rem"
              fontWeight="bold"
              color="inherent"
              cursor="pointer"
            />
          )}
        </ThreatIntelChartButton>
      </ThreatIntelChartHeader>
      {currentActive === "pie" ? (
        <ThreatIntelPieChart data={pieChartData} />
      ) : (
        <ThreatIntelBarChart data={barChartData} />
      )}
    </>
  );
};

export default ThreatIntelChartContainer;
