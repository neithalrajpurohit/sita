import {
  createAsyncThunk,
  createSlice,
  Dispatch,
  AnyAction,
} from "@reduxjs/toolkit";
import { CallbackfunctionType } from "../../definition/StoreStateType";
import { axiosPrivate } from "../../helpers/ApiClient";
import { EndPoints } from "../../helpers/ApiEndPoints";
import { RootState } from "../../configureStore";

import {
  AdminAssetData,
  FetchCategoryDetails,
  FetchFunctionDetails,
  FetchTypeDetails,
  FetchTagsDetails,
  tmfArr,
  AssetInitialState,
} from "./AdminType";

const initialState: AssetInitialState = {
  functionData: [],
  categoryData: [],
  typeData: [],
  tagsData: [],
  assetData: {
    data: {
      functionDetails: [],
      categoryDetails: [],
      typeDetails: [],
      tags: [],
    },
  },
  tmfInput: [],
  tmfDataArr: [],
  useCases: [],
};

const fetchFunctionAndProcessData = createAsyncThunk<AdminAssetData>(
  "FPData/fetch",
  async () => {
    const response = await axiosPrivate.post(
      EndPoints.FETCH_PREDEFINED_FUNCTIONS,
      {}
    );
    return response.data;
  }
);

const addPredefinedFunction = createAsyncThunk<
  any,
  {
    id: number | null;
    functionId: string;
    functionName: string;
  },
  CallbackfunctionType
>("addFunction/post", async (payload) => {
  const response = await axiosPrivate.post(
    EndPoints.ADD_PREDEFINED_FUNCTION,
    payload
  );
  return response.data;
});

const addPredefinedProcess = createAsyncThunk<
  any,
  {
    id: number | null;
    parentFunctionId: string;
    processId: string;
    processName: string;
    isuserDef: boolean;
  },
  CallbackfunctionType
>("addprocess/post", async (payload) => {
  const response = await axiosPrivate.post(
    EndPoints.ADD_PREDEFINED_PROCESS,
    payload
  );
  return response.data;
});

const addPredefinedCategory = createAsyncThunk<
  any,
  {
    categoryId: number | null;
    categoryName: string;
  },
  CallbackfunctionType
>("addCategory/post", async (payload) => {
  const response = await axiosPrivate.post(
    EndPoints.ADD_PREDEFINED_CATEGORY,
    payload
  );
  return response.data;
});

const addPredefinedSubCategory = createAsyncThunk<
  any,
  {
    categoryId: number | null;
    subcatId: number | null;
    subcatName: string;
  },
  CallbackfunctionType
>("addSubCategory/post", async (payload) => {
  const response = await axiosPrivate.post(
    EndPoints.ADD_PREDEFINED_SUBCATEGORY,
    payload
  );
  return response.data;
});

const addPredefinedType = createAsyncThunk<
  any,
  {
    typeId: number | null;
    typeName: string;
  },
  CallbackfunctionType
>("addType/post", async (payload) => {
  const response = await axiosPrivate.post(
    EndPoints.ADD_PREDEFINED_TYPE,
    payload
  );
  return response.data;
});

const addPredefinedSubType = createAsyncThunk<
  any,
  {
    typeId: number | null;
    subtypeId: number | null;
    subtypeName: string;
  },
  CallbackfunctionType
>("addSubType/post", async (payload) => {
  const response = await axiosPrivate.post(
    EndPoints.ADD_PREDEFINED_SUBTYPE,
    payload
  );
  return response.data;
});

const addPredefinedTags = createAsyncThunk<
  any,
  {
    tagsId: number | null;
    tagsName: string;
  },
  CallbackfunctionType
>("addTags/post", async (payload) => {
  const response = await axiosPrivate.post(
    EndPoints.ADD_PREDEFINED_TAGS,
    payload
  );
  return response.data;
});

const removePredefinedFunction = createAsyncThunk<
  any,
  { functionId: string },
  CallbackfunctionType
>("removeFunction/post", async (payload) => {
  const response = await axiosPrivate.post(
    EndPoints.REMOVE_PREDEFINED_FUNCTION,
    payload
  );
  return response.data;
});

const removePredefinedProcess = createAsyncThunk<
  any,
  { processId: string },
  CallbackfunctionType
>("removeProcess/post", async (payload) => {
  const response = await axiosPrivate.post(
    EndPoints.REMOVE_PREDEFINED_PROCESS,
    payload
  );
  return response.data;
});

const removePredefinedCategory = createAsyncThunk<
  any,
  { categoryId: number },
  CallbackfunctionType
>("removeCategory/post", async (payload) => {
  const response = await axiosPrivate.post(
    EndPoints.REMOVE_PREDEFINED_CATEGORY,
    payload
  );
  return response.data;
});

const removePredefinedSubCategory = createAsyncThunk<
  any,
  { subcatId: number },
  CallbackfunctionType
>("removeSubCategory/post", async (payload) => {
  const response = await axiosPrivate.post(
    EndPoints.REMOVE_PREDEFINED_SUBCATEGORY,
    payload
  );
  return response.data;
});

const removePredefinedType = createAsyncThunk<
  any,
  { typeId: number },
  CallbackfunctionType
>("removeType/post", async (payload) => {
  const response = await axiosPrivate.post(
    EndPoints.REMOVE_PREDEFINED_TYPE,
    payload
  );
  return response.data;
});

const removePredefinedSubType = createAsyncThunk<
  any,
  { subtypeId: number },
  CallbackfunctionType
>("removeSubType/post", async (payload) => {
  const response = await axiosPrivate.post(
    EndPoints.REMOVE_PREDEFINED_SUBTYPE,
    payload
  );
  return response.data;
});

const removePredefinedTags = createAsyncThunk<
  any,
  { tagsId: number },
  CallbackfunctionType
>("removeTags/post", async (payload) => {
  const response = await axiosPrivate.post(
    EndPoints.REMOVE_PREDEFINED_TAGS,
    payload
  );
  return response.data;
});

const updatePredefinedFunction = createAsyncThunk<
  FetchFunctionDetails,
  FetchFunctionDetails
>("updatePredefinedFunction", async (payload) => {
  return payload;
});

const deleteFunction = createAsyncThunk<
  FetchFunctionDetails,
  FetchFunctionDetails
>("deleteFunction", async (payload) => {
  return payload;
});

const updatePredefinedCategory = createAsyncThunk<
  FetchCategoryDetails,
  FetchCategoryDetails
>("updatePredefinedCategory", async (payload) => {
  return payload;
});

const deleteCategory = createAsyncThunk<
  FetchCategoryDetails,
  FetchCategoryDetails
>("deleteCategory", async (payload) => {
  return payload;
});

const updatePredefinedType = createAsyncThunk<
  FetchTypeDetails,
  FetchTypeDetails
>("updatePredefinedType", async (payload) => {
  return payload;
});

const deleteType = createAsyncThunk<FetchTypeDetails, FetchTypeDetails>(
  "deleteType",
  async (payload) => {
    return payload;
  }
);

const updatePredefinedTags = createAsyncThunk<
  FetchTagsDetails,
  FetchTagsDetails
>("updatePredefinedTags", async (payload) => {
  return payload;
});

const deleteTags = createAsyncThunk<FetchTagsDetails, FetchTagsDetails>(
  "deleteTags",
  async (payload) => {
    return payload;
  }
);

const fetchTmfAllData = createAsyncThunk("fetchTmfAllData", async () => {
  const response = await axiosPrivate.post(EndPoints.GET_TMF_DATA, {});
  return response.data;
});

const addUpdatetmfFactor = createAsyncThunk<any, tmfArr>(
  "addUpdatetmfFactor",
  async (payload) => {
    const response = await axiosPrivate.post(
      EndPoints.ADD_UPDATE_TMF_FACTOR,
      payload
    );
    return response.data;
  }
);
const deleteTmfFactor = createAsyncThunk<any, { id: number | null }>(
  "deleteTmfFactor",
  async (payload) => {
    const response = await axiosPrivate.post(
      EndPoints.DELETE_TMF_FACTOR,
      payload
    );
    return response.data;
  }
);

const fetchUseCaseAndRules = createAsyncThunk(
  "fetchUseCaseAndRules",
  async () => {
    const response = await axiosPrivate.post(EndPoints.GET_USECASE, {});
    return response.data.allData;
  }
);
const addUpdateUseCase = createAsyncThunk<
  any,
  { usecaseName: string; usecaseId: null | number }
>("addUpdateUseCase", async (payload) => {
  const response = await axiosPrivate.post(EndPoints.ADD_USECASE, payload);
  return response.data;
});
const deleteUseCase = createAsyncThunk<any, { usecaseId: null | number }>(
  "deleteUseCase",
  async (payload) => {
    const response = await axiosPrivate.post(EndPoints.DELETE_USECASE, payload);
    return response.data;
  }
);

const addUpdateRuleToUseCase = createAsyncThunk<
  any,
  {
    ruleName: string;
    usecaseId: null | number;
    ruleId: null | number;
  }
>("addUpdateRuleToUseCase", async (payload) => {
  const response = await axiosPrivate.post(EndPoints.ADD_RULE, payload);
  return response.data;
});

const deleteRule = createAsyncThunk<any, { ruleId: null | number }>(
  "deleteRule",
  async (payload) => {
    const response = await axiosPrivate.post(EndPoints.DELETE_RULE, payload);
    return response.data;
  }
);

const AdminAssetSlice = createSlice({
  name: "AdminAssetStore",
  initialState,
  reducers: {
    resetState: (state: AssetInitialState) => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFunctionAndProcessData.fulfilled, (state, action) => {
      state.functionData = action.payload.data.functionDetails;
      state.categoryData = action.payload.data.categoryDetails;
      state.typeData = action.payload.data.typeDetails;
      state.tagsData = action.payload.data.tags;
    });
    builder.addCase(addPredefinedFunction.fulfilled, (state, action) => {
      state.functionData = action.payload;
    });
    builder.addCase(addPredefinedProcess.fulfilled, (state, action) => {
      state.functionData = action.payload;
    });
    builder.addCase(addPredefinedCategory.fulfilled, (state, action) => {
      state.categoryData = action.payload;
    });
    builder.addCase(addPredefinedSubCategory.fulfilled, (state, action) => {
      state.categoryData = action.payload;
    });
    builder.addCase(addPredefinedType.fulfilled, (state, action) => {
      state.typeData = action.payload;
    });
    builder.addCase(addPredefinedSubType.fulfilled, (state, action) => {
      state.typeData = action.payload;
    });
    builder.addCase(addPredefinedTags.fulfilled, (state, action) => {
      state.tagsData = action.payload;
    });
    builder.addCase(updatePredefinedFunction.fulfilled, (state, action) => {
      state.functionData = action.payload;
    });
    builder.addCase(deleteFunction.fulfilled, (state, action) => {
      state.functionData = action.payload;
    });

    builder.addCase(updatePredefinedCategory.fulfilled, (state, action) => {
      state.categoryData = action.payload;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.categoryData = action.payload;
    });

    builder.addCase(updatePredefinedType.fulfilled, (state, action) => {
      state.typeData = action.payload;
    });
    builder.addCase(deleteType.fulfilled, (state, action) => {
      state.typeData = action.payload;
    });

    builder.addCase(updatePredefinedTags.fulfilled, (state, action) => {
      state.tagsData = action.payload;
    });
    builder.addCase(deleteTags.fulfilled, (state, action) => {
      state.tagsData = action.payload;
    });

    builder.addCase(removePredefinedFunction.fulfilled, (state, action) => {});
    builder.addCase(removePredefinedProcess.fulfilled, (state, action) => {});
    builder.addCase(removePredefinedCategory.fulfilled, (state, action) => {});
    builder.addCase(
      removePredefinedSubCategory.fulfilled,
      (state, action) => {}
    );
    builder.addCase(removePredefinedType.fulfilled, (state, action) => {});
    builder.addCase(removePredefinedSubType.fulfilled, (state, action) => {});
    builder.addCase(removePredefinedTags.fulfilled, (state, action) => {});

    builder.addCase(fetchTmfAllData.fulfilled, (state, action) => {
      state.tmfInput = action.payload.tmfInputs;
      state.tmfDataArr = action.payload.allData;
    });
    builder.addCase(addUpdatetmfFactor.fulfilled, (state, action) => {
      state.tmfDataArr = action.payload.allData;
    });
    builder.addCase(deleteTmfFactor.fulfilled, (state, action) => {
      state.tmfDataArr = action.payload.allData;
    });
    builder.addCase(fetchUseCaseAndRules.fulfilled, (state, action) => {
      state.useCases = action.payload;
    });
    builder.addCase(addUpdateUseCase.fulfilled, (state, action) => {
      state.useCases = action.payload.allData;
    });
    builder.addCase(deleteUseCase.fulfilled, (state, action) => {
      state.useCases = action.payload.allData;
    });
    builder.addCase(addUpdateRuleToUseCase.fulfilled, (state, action) => {
      state.useCases = action.payload.allData;
    });
    builder.addCase(deleteRule.fulfilled, (state, action) => {
      state.useCases = action.payload.allData;
    });
  },
});
const ResetState =
  () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(resetState());
  };
const { resetState } = AdminAssetSlice.actions;
export default AdminAssetSlice.reducer;

export const AdminAssetActionCreator = {
  fetchFunctionAndProcessData,
  addPredefinedFunction,
  addPredefinedProcess,
  addPredefinedCategory,
  addPredefinedSubCategory,
  addPredefinedType,
  addPredefinedSubType,
  addPredefinedTags,
  updatePredefinedFunction,
  deleteFunction,
  updatePredefinedCategory,
  deleteCategory,
  updatePredefinedType,
  deleteType,
  updatePredefinedTags,
  deleteTags,
  removePredefinedFunction,
  removePredefinedProcess,
  removePredefinedCategory,
  removePredefinedSubCategory,
  removePredefinedType,
  removePredefinedSubType,
  removePredefinedTags,
  fetchTmfAllData,
  addUpdatetmfFactor,
  deleteTmfFactor,
  ResetState,
  fetchUseCaseAndRules,
  addUpdateUseCase,
  deleteUseCase,
  addUpdateRuleToUseCase,
  deleteRule,
};
