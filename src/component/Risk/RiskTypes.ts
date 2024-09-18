export interface RiskGuageProps {
  GuageHeight?: string;
  GuageWidth?: string;
  reset: boolean;
  needles: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}
export interface EntityCardProps {
  cardTitle: string;
  icon: string;
  link: string;
  isDisable: boolean;
}
export interface ArrProps {
  Arr: string[];
  currentActive: string;
  filled: number;
  onClick: (value: string) => void;
}
