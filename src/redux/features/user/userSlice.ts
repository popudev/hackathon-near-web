import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Major } from "@/services/major/types";
import { Subject } from "@/services/subject/type";
import { Instructor } from "@/services/user/types";
import { UserThunks } from "./userThunk";

export type UserState = {
  instructors: Instructor[];
};

const initialState: UserState = {
  instructors: [],
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(UserThunks.getInstructors.fulfilled, (state, action) => {
      state.instructors = action.payload;
    });
  },
});

export const UserActions = user.actions;
