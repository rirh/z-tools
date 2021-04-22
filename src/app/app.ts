import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const name = "app";

export const reducers = {
  updateNotice: (state: any, _: PayloadAction<any>) => {
    state.Snackbar = {...state.Snackbar,..._.payload};
  },
};

export const initialState = {
 Snackbar:{
     open:false,
     severity:'info',//error warning success info
     vertical:'top' ,
     horizontal:'right',
     message:'hi'
 },
};
export const appSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const selectAppSlice = (state: any) => state[appSlice.name]

// Action creators are generated for each case reducer function
export const {  updateNotice } = appSlice.actions;
