export interface RUDFilterOptionsProps {
  GeoLocation: { value: number; label: string }[];
  Function: { value: number; label: string }[];
  Process: { value: number; label: string }[];
  Asset: { value: number; label: string }[];
}
export interface RUDFilterOptions {
  headerFilters: {
    GeoLocation: { value: number; label: string }[];
    Function: { value: number; label: string }[];
    Process: { value: number; label: string }[];
    Asset: { value: number; label: string }[];
  };
  fromDate: string;
  toDate: string;
}

export interface IRUDChartId {
  RUD_RISK_IMPACT: string;
  RUD_FUNCTIONCHART: string;
  RUD_PROCESSCHART: string;
  RUD_GEOCHART: string;
  RUD_HEATMAPCHART: string;
}

export interface IRiskCardProps {
  id: string;
  Element: any;
  title: string;
  hidden: boolean;
  position: number;
}
export interface DropDownItemProps {
  id: string;
  title: string;
}
