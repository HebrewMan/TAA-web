import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getLocal, setLocal } from "@/utils";

export interface AppState {
  address: string;
  name: string;
  status: string;
}

const initialState: AppState = { address: "", name: "", status: "" };

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInfoData: (state, action: PayloadAction<any>) => {
      state.address = action.payload.address;
      state.name = action.payload.name;
    },
    setPopusStatus: (state, action: PayloadAction<string>) => {
      console.log(action.payload);

      state.status = action.payload;
    },
  },
});

export const selectAppSlice = (state: RootState) => state.app;
export const { setInfoData, setPopusStatus } = appSlice.actions;
export default appSlice.reducer;
