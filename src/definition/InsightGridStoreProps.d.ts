export interface TselectedDropdownOption {
 label:string;
 value:string;
}

export interface dropdownfilter{
    id:string;
    value:string;
  }

  export interface TRequestPayloadOfGrid {
    fromDate: string;
    toDate: string;
    region: string;
    selectedOption: string;
    selectedFilter?: (string)[] | null;
    dropdownFilters?: (DropdownFiltersEntity)[] | null;
  }
  export interface DropdownFiltersEntity {
    id: string;
    value: string;
  }
  