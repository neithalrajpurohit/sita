// Entity Asset Types
// Define the payload type for the action
export type UpdateEntityAssetsPayload = {
  assetId: number | null;
  assetName: string;
  functionData: {
    functionId: string;
    functionName: string;
    processes: {
      processId: string;
      processName: string;
    }[];
  };
  location: {
    locationId: number;
    locationName: string;
  };
  category: {
    categoryId: number;
    categoryName: string;
    subcategory: {
      subcategoryId: number;
      subcategoryName: string;
    };
  };
  type: {
    typeId: number;
    typeName: string;
    subtype: {
      subtypeId: number;
      subtypeName: string;
    };
  };
  tags: {
    tagsId: number;
    tagsName: string;
  }[];
  is_internal: boolean;
};

export type UpdateEntityFunctionAndProcessesPayload = {
  functionId: string;
  isuserDef: boolean;
  functionName: string;
  functionColor: string;
  process: {
    processName: string;
    isuserDef: boolean;
    parentId: string;
    processColor: string;
    processId: string;
  }[];
};

export type AssetType = {
  typeId: number;
  typeName: string;
  subType: {
    subtypeId: number;
    subtypeName: string;
  }[];
};

export type CatergoryType = {
  categoryId: number;
  categoryName: string;
  subcat: {
    subcatId: number;
    subcatName: string;
    typeData: AssetType[];
  }[];
};
export type InitialState = {
  assetTableData: UpdateEntityAssetsPayload[];
  companyLocation: {
    locationId: number;
    locationName: string;
  }[];
  companyFunction: UpdateEntityFunctionAndProcessesPayload[];
  assetCategory: CatergoryType[];
  assetType: AssetType[];
  tags: {
    tagsId: number;
    tagsName: string;
  }[];
  rejectedData: [][];
};

///////  Entity Creation types

export type PrimaryState = { entityCreation: UpdateEntityCreationPayload };
export type UpdateEntityCreationPayload = {
  companyId: number;
  no_of_employee: number;
  companyName: string;
  companyLogo: string;
  companyLocations: {
    countryobj: {};
    stateobj: {};
    cityobj: {};
    state: string;
    country: string;
    city: string;
    office: string;
    locationId: string;
    position: { lat: number; lng: number };
  }[];
};

//////   Entity Function and process types

export type SecondaryState = {
  FunctionAndProcesses: UpdateEntityFunctionAndProcessesPayload[];
  PreFunctionAndProcesses: UpdateEntityFunctionAndProcessesPayload[];
  CustomFuncProcess: UpdateEntityFunctionAndProcessesPayload[];
  CustomProcess: CustomProcesses[];
};

export type CustomProcesses = {
  processName: string;
  isuserDef: boolean;
  processColor: string;
  parentId: string;
  processId: string;
};

// Entity Onboarding type

export type UpdateEntityFilledStatusPayload = {
  page: number;
};

export interface AssetSummaryValidationObj {
  type_id: number;
  type_name: string;
  enrolled_assets: number;
  total_asset_qty: number;
  same_as_enrolled: boolean;
  soc_coverage: number;
}

export type InitialStateAssetSummaryValidation = {
  AssetSummaryValidation: AssetSummaryValidationObj[];
};
