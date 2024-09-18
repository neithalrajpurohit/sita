export type AssetInventoryType = Array<{
  heading: "Function" | "Process" | "GEO";
  isCollapsed: boolean;
  options: {
    label: string;
    value: string;
    checked: boolean;
  }[];
}>;

export type AssetCollectionType = Array<{
  id: number;
  name: string;
  type: string;
  category: string;
  functionName: string;
  selected: boolean;
}>;

export type RiskGaugesType = Array<{
  resource: "Asset" | "Process" | "Function" | "GEO";
  inherentRisk: number;
  residualRisk: number;
  quantity: number;
}>;

export interface AssetInventoryTreeProps {
  title: string;
  assetInventoryTreeFilter: AssetInventoryType;
  handleFilterChange: (
    filterIndex: number,
    optionIndex: number,
    updatedCheckedValue: boolean
  ) => void;
  toggleFilterCollapse: (filterIndex: number, isCollapsed: boolean) => void;
}

export interface RiskImpactCardProps {
  title: string;
}

export interface InherentResidualProps {
  title: string;
  overAllRiskGauge: {
    inherentRisk: number;
    residualRisk: number;
  };
}

export interface AssetCollectionCardProps {
  title: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  assetsCollectionData: AssetCollectionType;
  toggleAllAssetSelection: (isChecked: boolean) => void;
  filteredassetsCollectionData: AssetCollectionType;
  handleAssetCollectionSelection: (id: number, checked: boolean) => void;
}

export interface RiskGaugeCardProps {
  riskGauges: RiskGaugesType;
}
export interface DropDownItemProps {
  id: string;
  title: string;
}
