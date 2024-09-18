export type FetchAdminData = {
  data: Array<{
    tenantName: string;
    tenantSchema: string;
    packageName: string;
    isActive: boolean;
    packageValidity: string;
    sources: any[];
  }>;
};

export type AddTenant = {
  schema_name: string | null;
  name?: string | null;
  domain?: string | null;
  package: string | null;
};

export type UsersDetails = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  mfaStatus: boolean;
  roleId: number;
  roleName: string;
  company: string;
};
export type AddUsers = {
  userId: string | null;
  schemaName: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
};

export type UpdateUsers = {
  userId: string;
  schemaName: string;
  firstName: string;
  lastName: string;
  email: string;
  roleName: string;
  password: string;
};

export type tenantId = {
  schema: string;
};
export type tenantMatrixId = {
  schemaName: string;
};

export type userStatus = {
  isSuspended: boolean;
};

export type tenantMatrixType = {
  tenantMatrix: Array<{
    title: string;
    value: number;
  }>;
};

export type userMatrixType = {
  userMatrix: Array<{
    title: string;
    value: number;
  }>;
};

export type fetchRolesType = {
  value: string;
  data: Array<{
    value: string;
    label: string;
  }>;
};

export type fetchPackagesType = {
  data: Array<{
    packageId: string;
    packageName: string;
    Assets: string;
    features: Array<string>;
  }>;
};

export type fetchFaqType = {
  data: Array<{
    id: number;
    question: string;
    answer: string;
  }>;
};

export type InitialState = {
  tenantData: Array<{
    tenantName: string;
    tenantSchema: string;
    isActive: boolean;
    packageName: string;
    packageValidity: string;
    sources: any[];
  }>;
  tenantId: any;
  tenantMatrixId: any;
  tenantSchemaName: string;
  Users: Array<UsersDetails>;
  isSuspended: boolean;
  UserData: Array<AddUsers>;
  tenantMatrixData: Array<{
    title: string;
    value: number;
  }>;
  userMatrixData: Array<userMatrixType>;
  Roles: Array<fetchRolesType>;
  fetchPackageData: Array<{
    packageId: string;
    packageName: string;
    Assets: string;
    features: Array<string>;
  }>;
  fetchFaqData: Array<{
    id: number;
    question: string;
    answer: string;
  }>;
};

// Admin Asset Type
export type AdminAssetData = {
  data: {
    functionDetails: Array<{
      id: number | null;
      functionId: string;
      functionName: string;
      functionColor: string;
      process: Array<{
        id: number | null;
        processId: string;
        parentId: string;
        processName: string;
        isuserDef: boolean;
        processColor: string;
      }>;
      isuserDef: boolean;
    }>;
    categoryDetails: Array<{
      categoryId: number;
      categoryName: string;
      subcat: Array<{
        subcatId: number;
        subcatName: string;
      }>;
    }>;
    typeDetails: Array<{
      typeId: number;
      typeName: string;
      subtype: Array<{
        subtypeId: number;
        subtypeName: string;
      }>;
    }>;
    tags: Array<{
      tagsId: number;
      tagsName: string;
    }>;
  };
};

export type FetchFunctionDetails = {
  id: number | null;
  functionId: string;
  functionName: string;
  functionColor: string;
  process: {
    id: number | null;
    processId: string;
    parentId: string;
    processName: string;
    isuserDef: boolean;
    processColor: string;
  }[];
  isuserDef: boolean;
}[];

export type FetchCategoryDetails = {
  categoryId: number | null;
  categoryName: string;
  subcat: {
    subcatId: number | null;
    subcatName: string;
  }[];
}[];

export type FetchTypeDetails = {
  typeId: number | null;
  typeName: string;
  subtype: {
    subtypeId: number | null;
    subtypeName: string;
  }[];
}[];

export type FetchTagsDetails = {
  tagsId: number | null;
  tagsName: string;
}[];

export type tmfInputs = {
  key: string;
  operationalOn: string;
  keyName: string;
}[];

export type tmfArr = {
  id: null | number;
  category: {
    categoryId: number | null;
    categoryName: string;
    subcategory: {
      subcategoryId: number | null;
      subcategoryName: string;
    };
  };
  type: {
    typeId: number | null;
    typeName: string;
    subtype: {
      subtypeId: number | null;
      subtypeName: string;
    };
  };
  tmfFactor: {
    key: string;
    operationalOn: string;
    keyName: string;
    value: number;
  }[];
};

export type useCasesTypes = {
  usecaseName: string;
  usecaseId: null | number;
  Rule: {
    ruleId: number | null;
    ruleName: string;
  }[];
};

export type AssetInitialState = {
  functionData: FetchFunctionDetails;
  categoryData: FetchCategoryDetails;
  typeData: FetchTypeDetails;
  tagsData: FetchTagsDetails;
  assetData: AdminAssetData;
  tmfInput: tmfInputs;
  tmfDataArr: tmfArr[];
  useCases: useCasesTypes[];
};
