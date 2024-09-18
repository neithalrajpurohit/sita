export interface Tdate {
    selection: Selection;
  }
  export interface Selection {
    startDate: Date;
    endDate: Date;
    key: string;
  }

  export interface TSelectedFilters {
    fromDate: Date | string;
    toDate: Date | string;
    filterOptions: FilterOptions;
  }
  export interface FilterOptions {
    headerOption: string;
    headerFilters?: (string)[] | null;
  }
  
  