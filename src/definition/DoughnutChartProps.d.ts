import { TChartData } from './ChartData';

export interface TDoughnutChartProps {
  ChartData: ChartData;
  onChartClick?: any;
}

export interface ChartData {
  data: TChartData;
  ref?: any;
}

export interface DataPath {
  DataPath: Path;
  onDataPath?: any;
  setDataPath?: any;
  startDate?:any;
  endDate?:any;
}
