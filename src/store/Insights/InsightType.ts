import { IncidentDetails } from "../../definition/InsightDetails";
import { TDropdownData } from "../../definition/InsightGridHeaderData";
import { IGrid } from "../../definition/GridData";
import { dropdownfilter } from "../../definition/InsightGridStoreProps";
// Insight Details type

export interface InsightDetailsState {
  insightDetailsData: IncidentDetails;
  isLoading: boolean;
  isLoaded: boolean;
  isError: boolean;
  error: string;
  selectedIncidentId: string;
  id: number | string;
  isCloseIncident: boolean;
  isCloseIncidentLoading: boolean;
  isAddUpdateLoading: boolean;
  isAddUpdateResp: { message: string; status: number };
  isAddUpdateError: boolean;
}

export interface FetchDataParams {
  incidentId: string;
  Id: number | string;
}

// Insight Grid Type
export interface InsightsState {
  isGridDataLoading: boolean;
  isGridDataLoaded: boolean;
  GridData: IGrid;
  isGridDataError: boolean;
  startDate: Date;
  endDate: Date;
  dropdownfilters: dropdownfilter[];
  // resolution states
  isRequestResolutionLoading: boolean;
  isRequestResolutionLoaded: boolean;
  requestResoluationResponse: any;
  isRequestResolutionError: boolean;
  requestResoluationStatus: boolean;

  isRequestUserCommentLoading: boolean;
  isRequestUserCommentLoaded: boolean;
  requestUserCommentResponse: any;
  isRequestUserCommentError: boolean;
  requestUserCommentStatus: boolean;

  dropDownData: TDropdownData[];
  currentPage: number;
}

// Insights type
export type initialStateProps = {
  headerFilters: {
    GeoLocation: { value: number; label: string }[];
    Function: { value: number; label: string }[];
    Process: { value: number; label: string }[];
    Asset: { value: number; label: string }[];
  };
  fromDate: string;
  toDate: string;
  data: any[];
  isLoading: boolean;
  internalFilters: { key: string; value: string }[];
  layoutInfo: any[];
};
export interface LayoutInfo {
  page: string;
}

export interface LayoutResponse {
  page: string;
  layoutInformation: [
    {
      id: string;
      hidden: boolean;
      position: number;
    }
  ];
}
