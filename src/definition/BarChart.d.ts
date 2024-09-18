import { HeaderSortingClasses } from "react-bootstrap-table-next";

export interface TBarChartData {
  chartHeading?: chartHeading;
  chartOptions: ChartOptions;
  data: Data;
  barChartHeading?: Header;
}
export interface Header {
  title?: string;
  subTitle?: string;
}
export interface chartHeading {
  title?: string;
  xaxislabel?: string;
}
export interface ChartOptions {
  stacked: boolean;
  stepSize: number;
  legendPosition?: string;
  scaleLabelofYaxis?: TScaleLabel;
  scaleLabelofXaxis?: TScaleLabel;
  showLendend: boolean;
  categoryPercentage: number;
}
export interface Data {
  labels: string[];
  datasets: DatasetsEntity[];
}
export interface DatasetsEntity {
  label: string;
  data?: number[] | null;
  backgroundColor: string;
  barPercentage: number;
}
export interface TScaleLabel {
  display: boolean;
  labelString: string;
  fontStyle: string;
  fontSize: number;
  fontColor: string;
}
