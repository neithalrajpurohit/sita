// SecurityPulseDetails type
import { SecurityPulseDetail } from "../../definition/SecurityPulseDetail";
import { SecurityPulseGrid } from "../../definition/SecurityPulseGrid";
import { TDropdownData } from "../../definition/InsightGridHeaderData";
import { dropdownfilter } from "../../definition/InsightGridStoreProps";
export interface SecurityPulseDetailsState {
    // insightDetailsData: TInsightDetailsData;
    SecurityPulseDetailsData: SecurityPulseDetail;
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
    error: string;
    selectedIncidentId: string;
    isPreview: boolean;

    // isCloseIncident: boolean;
}

// SecurityPulseGrid type

export interface SecurityPulseState {
    startDate: Date;
    endDate: Date;
    dropdownfilters: dropdownfilter[];
    gridData: SecurityPulseGrid;
    isGridDataLoading: boolean;
    isGridDataLoaded: boolean;
    isGridDataError: boolean;
    gridDataError: string;
    dropDownData: TDropdownData[];
    isDeleteSecurityPulseLoading: boolean;
    isDeleteSecurityPulseSuccess: boolean;
    isDeleteSecurityPulseError: boolean;
    isDeleteSecurityPulseResp: { message: string; status: string };
    currentPage: number;
}
