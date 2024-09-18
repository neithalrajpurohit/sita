export interface TFillIndicatorChartProps {
  id?: string;
  title: string;
  data: { color: string; title: string; val: number; eventCount: number }[];
}

//  FILL INDICATOR COMP TYPES

export interface fillProps {
  fillNumber: any;
  color: string;
  title: string;
  type: number;
  eventCount: number;
  icon?: React.ReactNode;
  onClick: (title: string) => void;
  height?: number;
}
export interface fillIndiProps {
  fillNumber: any;
  color: string;
  type: number;
  eventCount: number;
  height?: number;
}
export interface fillIndiTitleProps {
  type: number;
}
export interface BoxProps {
  opacity: number;
}

//  reusable card types
