import { createSlice } from "@reduxjs/toolkit";
import { UserMetadata } from "types/entities";
import { JWTPayload } from "jose";
import { UserThunks } from "./userThunk";
import { DecodeToken } from "types";

export type UserState = {
  students: UserMetadata[];
  instructors: UserMetadata[];
  payload: DecodeToken<JWTPayload, UserMetadata>;
};

const initialState: UserState = {
  payload: null,
  instructors: [],
  students: [],
};

export const user = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser(state, action) {
      const { payload, type } = action;
      state.payload = { ...payload };
    },
  },
  extraReducers: (build) => {
    build.addCase(UserThunks.getPayload.fulfilled, (state, action) => {
      if (action.payload) {
        state.payload = action.payload;
      }
    });
    build.addCase(UserThunks.getInstructors.fulfilled, (state, action) => {
      state.instructors = action.payload;
    });
    build.addCase(UserThunks.getStudents.fulfilled, (state, action) => {
      state.students = action.payload;
    });
  },
});

export const UserActions = user.actions;
