import {
  TBarChartDataProps,
  TLineChartDataProps,
} from "../../definition/HighChartsOption";

interface TOEIProps {
  FunnelData: { color: string; text: string; value: number; hover: string }[];
  FillIndicator: { color: string; title: string; val: number }[];
  BarChart1: TBarChartDataProps;
  BarChart2: TBarChartDataProps;
  LineChart1: TLineChartDataProps;
  LineChart2: TLineChartDataProps;
  LineChart3: TLineChartDataProps;
}

export type initialStateProps = {
  headerFilters: {
    GeoLocation: { value: number; label: string }[];
    Function: { value: number; label: string }[];
    Process: { value: number; label: string }[];
    Asset: { value: number; label: string }[];
  };
  fromDate: string;
  toDate: string;
  data: TOEIProps;
  isLoading: boolean;
  layoutInfo: any[];
};
