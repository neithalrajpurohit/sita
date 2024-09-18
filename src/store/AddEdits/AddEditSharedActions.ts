import { axiosPrivate } from "../../helpers/ApiClient";
import { CallbackfunctionType } from "../../definition/StoreStateType";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { EndPoints } from "../../helpers/ApiEndPoints";
const { FETCH_INCIDENT_TAGS, FETCH_ASSET_TAGS, FETCH_ENITY_TAGS } = EndPoints;

export const getIncidentList = createAsyncThunk<
  string[],
  string,
  CallbackfunctionType
>("getIncidentList", async (inputValue) => {
  try {
    const resp = await axiosPrivate.post(FETCH_INCIDENT_TAGS, {
      inputFilter: inputValue,
    });
    return resp.data;
  } catch (error) {
    throw new Error();
  }
});

export const getAssetList = createAsyncThunk<
  string[],
  string,
  CallbackfunctionType
>("getAssetList", async (inputValue) => {
  try {
    const resp = await axiosPrivate.post(FETCH_ASSET_TAGS, {
      inputFilter: inputValue,
    });
    return resp.data;
  } catch (error) {
    throw new Error();
  }
});

export const getEntityList = createAsyncThunk<
  string[],
  string,
  CallbackfunctionType
>("getEntityList", async (inputValue) => {
  try {
    const resp = await axiosPrivate.post(FETCH_ENITY_TAGS, {
      inputFilter: inputValue,
    });
    return resp.data;
  } catch (error) {
    throw new Error();
  }
});

export const addEditActionCreator = {
  getAssetList,
  getEntityList,
  getIncidentList,
};
