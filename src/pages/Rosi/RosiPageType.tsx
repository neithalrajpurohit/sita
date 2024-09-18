export interface RosiCardProps {
  id: string;
  Element: any;
  title: string;
  dataKey:
    | "rosiChart"
    | "investmentOptimizationChart"
    | "functionChart"
    | "assetChart"
    | "geoLocationChart"
    | "totalInvestment";
  hidden: boolean;
  position: number;
}
export interface DropDownItemProps {
  id: string;
  title: string;
}
