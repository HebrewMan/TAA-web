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
}

export interface CatStatus {
  stamina: number; //体力
  charm: number; //魅力
  intellect: number; //智力
  comfort: number; //舒适
}

export interface CatState {
  defaultCat: string;
  catInfo: CatInfo;
  catStatus: CatStatus;
}

const initialState: CatState = {
  defaultCat: getLocal("defaultCat") || "",
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
  },
  catStatus: {} as CatStatus,
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
  },
});

export const selectCatSlice = (state: RootState) => state.cat;
export const { setDefaultCat, setCatInfo, setCatStatus } = catSlice.actions;
export default catSlice.reducer;
