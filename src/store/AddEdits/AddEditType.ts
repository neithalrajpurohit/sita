// Edit Perspective types
import { userInputDataType } from "../../definition/AddEditAnalysis";
import { FormDataState } from "../../definition/AddEditSecurityPulse";

export interface addAnalysisState {
    isAddAnalysisLoading: boolean;
    isAddAnalysisLoaded: boolean;
    isAddAnalysisError: boolean;
    AddAnalysisError: string;
    addAnalysisResp: {
        message: string;
        status: string;
    };
    isEditAnalysisLoading: boolean;
    isEditAnalysisLoaded: boolean;
    isEditAnalysisError: boolean;
    EditAnalysisError: string;
    editAnalysisData: userInputDataType;

    mode: string;

    //persists states
    FormData: userInputDataType;
    incidentList: string[];
    entityList: string[];
    assetList: string[];

    isTagLoading: boolean;
    isTagFetchError: boolean;
    cancleMode: string;
}

// Edit security pulse type

export interface SecurityPulseState {
    isAddSecurityPulseLoaded: boolean;
    isAddSecurityPulseLoading: boolean;
    isAddSecurityPulseError: boolean;
    AddSecurityPulseError: string;
    addSecurityPulseResp: {
        message: string;
        status: string;
    };

    isEditSecurityPulseLoading: boolean;
    isEditSecurityPulseLoaded: boolean;
    isEditSecurityPulseError: boolean;
    EditSecurityPulseError: string;
    editSecurityPulseData: FormDataState;

    mode: string;

    FormData: FormDataState;
    incidentList: string[];
    entityList: string[];
    assetList: string[];

    isTagLoading?: boolean;
    isTagFetchError?: boolean;
    cancleMode?: string;
}
