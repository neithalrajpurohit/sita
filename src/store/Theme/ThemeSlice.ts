import {
    AnyAction,
    createSlice,
    Dispatch,
    PayloadAction,
} from "@reduxjs/toolkit";
import { Theme } from "./ThemeType";

const initialState: Theme = {
    isLightTheme: true,
};

export const ThemeStore = createSlice({
    name: "ThemeStore",
    initialState,
    reducers: {
        setTheme: (state: Theme, action: PayloadAction<boolean>) => {
            return { ...state, isLightTheme: action.payload };
        },
    },
});

export const { setTheme } = ThemeStore.actions;
export default ThemeStore.reducer;

const changeTheme =
    (value: boolean) => async (dispatch: Dispatch<AnyAction>) => {
        dispatch(setTheme(value));
    };

export const ThemeActionCreator = {
    changeTheme,
};
