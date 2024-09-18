export type UpdateEntityFunctionAndProcessesPayload = {
  functionId: string;
  isuserDef: boolean;
  functionName: string;
  functionColor: string;
  process: {
    processName: string;
    isuserDef: boolean;
    processColor: string;
    processId: string;
    parentId: string;
  }[];
};

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

export type InitialState = {
  EntityForm: {
    companyId: 1;
    no_of_employee: 0;
    companyName: "";
    companyLogo: "";
    companyLocations: [];
  };
  FunctionAndProcesses: UpdateEntityFunctionAndProcessesPayload[];
  Assets: UpdateEntityAssetsPayload[];
  AssetSummaryValidation: {
    type_id: number;
    type_name: string;
    enrolled_assets: number;
    total_asset_qty: number;
    same_as_enrolled: boolean;
    soc_coverage: number;
  }[];
};
