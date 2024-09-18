export interface TChartHeaderData {
    chartHeader: ChartHeader;
  }
  export interface ChartHeader {
    headerTabs?: (string)[] | null;
    headerTabCheckboxes?: (HeaderTabCheckboxesEntity)[] | null;
    dropdownFilter?: (DropdownFilterEntity)[] | null;
  }
  export interface HeaderTabCheckboxesEntity {
    color?: string;
    displaySequence: number;
    checkboxLabel: string;
    checkboxTabs?: (string)[] | null;
    checkboxValue:string;
  }

  export interface DropdownFilterEntity {
    id: string;
    dropdownTabs?: (string)[] | null;
    dropdownoption?: (DropdownoptionEntity)[] | null;
  }
  export interface DropdownoptionEntity {
    value: string;
    label: string;
  }
  
  