// Insights type
export type initialThreatIntelStateProps = {
  headerFilters: {
    services: { value: number; label: string }[];
    status: { value: number; label: string }[];
    severity: { value: number; label: string }[];
  };
  fromDate: string;
  toDate: string;
  isLoading: boolean;
  subscribedModules: string[];
  grid: {
    gridHeader: GridHeaderColumn[];
    gridData: GridDataItem[];
  };
  attackSurfacePieChart: ThreatIntelPieCharts;
  attackSurfaceBarChart: ThreatIntelBarCharts;
  darkWebPieChart: ThreatIntelPieCharts;
  darkWebBarChart: ThreatIntelBarCharts;
  cyberCrimePieChart: ThreatIntelPieCharts;
  cyberCrimeBarChart: ThreatIntelBarCharts;
  brandIntelligencePieChart: ThreatIntelPieCharts;
  brandIntelligenceBarChart: ThreatIntelBarCharts;
  currentActiveCharts: {
    attack_surface: CybleChartType;
    dark_web: CybleChartType;
    cyber_crime: CybleChartType;
    brand_intelligence: CybleChartType;
  };
};

interface GridHeaderColumn {
  key: string;
  headerText: string;
  isSorting: boolean;
  type: string;
  hideOnUI: boolean;
}

export interface GridDataItem {
  [key: string]: string | number | boolean | Date; // Adjust based on the actual data types in your grid data
}

export interface ThreatIntelPieCharts {
  title: string;
  inner_value_1: string;
  inner_value_2: string;
  data: {
    type: string;
    name: string;
    data: {
      name: string;
      id: string;
      alertCount: number;
      y: number;
      color: string;
    }[];
  }[];
}

export interface ThreatIntelBarCharts {
  datalabels: boolean;
  title: string;
  category: string[];
  y_axis_label: string;
  data: {
    name: string;
    color?: string;
    pointPadding?: number;
    pointPlacement?: number;
    opacity?: number;
    data: (null | number)[];
  }[];
}

type CybleChartType = "pie" | "bar";

// Values For subscribedModules
// "brand_intelligence",
// "dark_web",
// "cyber_crime",
// "attack_surface"
