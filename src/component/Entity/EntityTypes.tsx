export interface FormData {
  data: any;
  onChange: any;
  dataStatus: "saved" | "unsaved";
}
export interface AssetSummaryProps {
  data: {
    type_id: number;
    type_name: string;
    enrolled_assets: number;
    total_asset_qty: number;
    same_as_enrolled: boolean;
    soc_coverage: number;
  }[];
  onChange: (
    newData: {
      type_id: number;
      type_name: string;
      enrolled_assets: number;
      total_asset_qty: number;
      same_as_enrolled: boolean;
      soc_coverage: number;
    }[]
  ) => void;
}

export type CurrentSelectedType = {
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

export type OptionsArr = {
  label: string;
  value: number;
};
