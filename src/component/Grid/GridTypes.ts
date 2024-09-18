import { dropdownfilter } from "../../definition/InsightGridStoreProps";
import { TDropdownData } from "../../definition/InsightGridHeaderData";
import { GridAddOn } from "../../definition/GridData";

export interface IGridProps {
  rowData: any;
  colData: any;
  selectedRows?: any[];
  setSelectedRows?: any;
  gridAddOn?: GridAddOn;
  InsightGridData?: any;
  InsightsData?: any;
  gridSelectedFilter: dropdownfilter[];
  handleGridFilterChange?: any;
  gridHeaderDropdownData: TDropdownData[];
  handleSelect?: any;
  selectionRange?: any;
  showGridHeader: boolean;
  showAddBtn: boolean | undefined;
  handleClickOnAddBtn: any;
  handleBlurPage?: any;
  PageName?: string;
  onEyeButtonClick?: any;
  currentPage?: number;
  setCurrentPage?: any;
}
export interface InsightGridHeaderProps {
  handleSelect: any;
  selectionRange: any;
  gridHeaderDropdownData: TDropdownData[];
  gridSelectedFilter: dropdownfilter[];
  handleGridFilterChange?: any;
  handleClickOnAddBtn: any;
  showAddBtn: boolean | undefined;
  handleBlurPage: any;
}
