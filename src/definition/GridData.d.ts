export interface GridSelectedFilter {
  startDate: string;
  endDate: string;
  selectedDropdownFiters:dropdownfilter[]
}

export interface GridAddOn {
  showFirstColumnAsCheckbox?: boolean;
  showLastColumnAsAction?: boolean;
}

export interface GridHeader {
  key: string;
  headerText: string;
  isSorting: boolean;
  type: string;
  hidden?:boolean;
}


export interface GridData {
  column0:string;
  column1: string;
  column2: string;
  column3: string;
  column4: Date;
  column5: Date;
  column6: string;
  column7: string;
  column8: string;
  actions?: any;
}

export interface IGrid {
  gridSelectedFilter: GridSelectedFilter;
  gridAddOn: GridAddOn;
  gridHeader: GridHeader[];
  gridData: GridData[];
}
