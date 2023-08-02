import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Major } from "@/services/major/types";
import { MajorThunks } from "./majorThunk";

export type MajorState = {
  majors: Major[];
};

const initialState: MajorState = {
  majors: [],
};

export const major = createSlice({
  name: "Major",
  initialState,
  reducers: {
    addMajor(state, action: PayloadAction<Major>) {
      state.majors.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(MajorThunks.getMajors.fulfilled, (state, action) => {
      state.majors = action.payload;
    });
  },
});

export const MajorActions = major.actions;
