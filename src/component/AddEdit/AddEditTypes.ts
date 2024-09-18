// ADD EDIT PERSPECTIVE TYPES
import { Filters, userInputDataType } from "../../definition/AddEditAnalysis";
import { FormDataState } from "../../definition/AddEditSecurityPulse";

export interface AddEditAnalysisCompProps {
  FormData: userInputDataType;
  options: {
    limit: number;
    SelectLevel: Filters[];
    ActionTaken: Filters[];
    errorMsg: string;
    isErrorMsg: boolean;
    AnalysisTypeOption: Filters[];
    incidentList: string[];
    assetList: string[];
    entityList: string[];
    ActedUponOption: Filters[];
  };
  buttonEventHandler: {
    handleCancel: any;
    handlePreview: any;
    handleSaveAsDraft: any;
  };
  tagsEventHandler: {
    getIncidentList: any;
    getAssetList: any;
    getEntityList: any;
  };
  tagFetchStatus: {
    isTagLoading: boolean;
    isTagFetchError: boolean;
  };
  eventHandler: any;
  errorHandler: any;
  deletePropertiesOfFormData: any;
}

export interface SecurityPulseForm {
  FormData: FormDataState;
  tagsEventHandler: any;
  options: {
    limit: number;
    incidentInputList: string[];
    assetsInputList: string[];
    entityInputList: string[];
    criticalityList: Filters[];
  };
  eventHandler: any;
  tagFetchStatus: any;
  buttonEventHandler: {
    handleCancel: any;
    handleSaveAsDraft: any;
    handlePreview: any;
  };
  sectionsHandler: any;
}
