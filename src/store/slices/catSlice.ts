import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getLocal, setLocal } from "@/utils";

export interface CatInfo {
  charm: number;
  comfort: number;
  desc: string;
  image: string;
  intellect: number;
  name: string;
  rate: number;
  stamina: number;
  token_id: number;
  level: number;
  selected: number;
  work_status: number;
  exp: number;
  max_exp: number;
}

export interface CatStatus {
  stamina: number; //体力
  happiness: number; //愉悦
  health: number; //智力
  comfort: number; //舒适
}

export interface CatState {
  defaultCat: string;
  catInfo: CatInfo;
  catStatus: CatStatus;
  catList: Array<any>;
}

const initialState: CatState = {
  defaultCat: "",
  catInfo: getLocal("catInfo") || {
    charm: 0,
    comfort: 0,
    desc: "",
    image: "",
    intellect: 0,
    name: "",
    rate: 0,
    stamina: 0,
    token_id: 0,
    level: 0,
    selected: 0,
    work_status: 0,
    exp: 0,
    max_exp: 0,
  },
  catStatus: {} as CatStatus,
  catList: [],
};

export const catSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setDefaultCat: (state, action: PayloadAction<string>) => {
      state.defaultCat = action.payload;
      setLocal("defaultCat", action.payload);
    },
    setCatInfo: (state, action: PayloadAction<any>) => {
      state.catInfo = action.payload;
      setLocal("catInfo", action.payload);
    },
    setCatStatus: (state, action: PayloadAction<any>) => {
      state.catStatus = action.payload;
    },
    setCatList: (state, action: PayloadAction<any>) => {
      state.catList = action.payload;
    },
  },
});

export const selectCatSlice = (state: RootState) => state.cat;
export const { setDefaultCat, setCatInfo, setCatStatus, setCatList } =
  catSlice.actions;
export default catSlice.reducer;
