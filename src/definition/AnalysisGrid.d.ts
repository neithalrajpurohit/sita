export interface AnalysisGrid {
  gridAddOn: GridAddOn;
  gridHeader: GridHeaderEntity[];
  gridData: GridDataEntity[];
}
export interface GridAddOn {
  showFirstColumnAsCheckbox: boolean;
  showLastColumnAsAction?: boolean;
}
export interface GridHeaderEntity {
  key: string;
  headerText: string;
  isSorting: boolean;
  type: string;
  hideOnUI?: boolean;
  dataDisplayLength?: number;
}
export interface GridDataEntity {
  incidentId: string;
  column1: string;
  column2: string;
  column3: string;
  column4: string;
  column5: string;
  column6: string;
  column7: string;
  column8: string;
}
// export interface AdvisoryGridDataProps {
//   advisory_id: string;
//   published_date: Date | string;
//   service_name: string;
//   title: string;
//   severity: string;
// }
export interface AdvisoryGrid {
  data: [];
  isLoading: boolean;
  fromDate: Date | string;
  toDate: Date | string;
  gridData: any[];
  isGridDataLoading: boolean;
  isGridDataLoaded: boolean;
  isGridDataError: boolean;
  gridDataError: string;
  pdfId: number;
  pdfData: null;
  gridAddOn: any;
  gridHeader: any[];
  dropdownfilters: dropdownfilter[];
  dropDownData: TDropdownData[];
  isDeleteSecurityPulseLoading: boolean;
  isDeleteSecurityPulseSuccess: boolean;
  isDeleteSecurityPulseError: boolean;
  isDeleteSecurityPulseResp: { message: string; status: string };
  currentPage: number;
}
