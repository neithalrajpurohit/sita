// Perspective Detail Types
import { PerspectiveDetailResp } from "../../definition/PerspectiveDetail";
import { AnalysisGrid } from "../../definition/AnalysisGrid";
import { TDropdownData } from "../../definition/InsightGridHeaderData";
import { dropdownfilter } from "../../definition/InsightGridStoreProps";

export interface AnalysisDetailsState {
    analysisDetailsData: PerspectiveDetailResp;
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
    error: string;
    selectedIncidentId: string;
    isPreview: boolean;
}

// Perspective Grid Types
export interface PerspectiveState {
    dropdownfilters: dropdownfilter[];
    startDate: Date;
    endDate: Date;
    gridData: AnalysisGrid;
    isGridDataLoading: boolean;
    isGridDataLoaded: boolean;
    isGridDataError: boolean;
    gridDataError: string;
    dropDownData: TDropdownData[];
    isDeletePerspectiveLoading: boolean;
    isDeletePerspectiveSuccess: boolean;
    isDeletePerspectiveError: boolean;
    isDeletePerspectiveResp: { message: string; status: string };
    currentPage: number;
}
