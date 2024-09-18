import { ChartProps } from "../../component/highcharts/ClickAbleBarChart";
import { TClickAblePieChart } from "../../component/highcharts/ClickAblePieChart";

export interface FilterOptions {
  headerFilters: {
    GeoLocation: { value: number; label: string }[];
    Function: { value: number; label: string }[];
    Process: { value: number; label: string }[];
    Asset: { value: number; label: string }[];
  };
  fromDate: string;
  toDate: string;
}

export interface FilterOptionsProps {
  GeoLocation: { value: number; label: string }[];
  Function: { value: number; label: string }[];
  Process: { value: number; label: string }[];
  Asset: { value: number; label: string }[];
}

export interface TFilterData {
  Top5Alert: {
    title: string;
    val: number;
    color: string;
    eventCount: number;
  }[];
  PieChart1: any[][];
  PieChart2: any[][];
  AlertType: {
    title: string;
    val: number;
    color: string;
    eventCount: number;
  }[];
  BarChartData: {
    name: string;
    data: [string, number | null][];
  }[];
  BarChartXCategory: string[];
  GridData: {
    Alert: string;
    AlertType: string;
    AlertDetails: string;
    StartDate: number;
    LastUpdated: number;
    STATUS: string;
    LEVEL: string;
    OWNER: string;
    ID: number;
  }[];
}

export interface DragItemProps {
  index: number;
  reset: boolean;
  Element:
    | React.LazyExoticComponent<
        ({
          selected,
          onBarCliked,
          data,
          category,
          title,
          id,
        }: ChartProps) => JSX.Element
      >
    | React.LazyExoticComponent<(props: TClickAblePieChart) => JSX.Element>;
  dataKey:
    | "Top5Alert"
    | "PieChart1"
    | "PieChart2"
    | "AlertType"
    | "BarChartData";
  data: TFilterData;
  onBarCliked: (e: string) => void;
  title: string;
  onSliceCliked: (e: string) => void;
  categoryKey?: "BarChartXCategory";
  id: string;
  hidden: boolean;
}

export interface InsightCardProps {
  id: string;

  Element:
    | React.LazyExoticComponent<
        ({
          selected,
          onBarCliked,
          data,
          category,
          title,
          id,
        }: ChartProps) => JSX.Element
      >
    | React.LazyExoticComponent<(props: TClickAblePieChart) => JSX.Element>;
  title: string;
  dataKey:
    | "Top5Alert"
    | "PieChart1"
    | "PieChart2"
    | "AlertType"
    | "BarChartData";
  categoryKey?: "BarChartXCategory" | undefined;
  hidden: boolean;
  position: number;
}
