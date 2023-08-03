import { createSlice } from "@reduxjs/toolkit";

import { UserMetadata } from "types/entities";
import { JWTPayload } from "jose";
import { Instructor } from "@/services/user/types";
import { UserThunk } from "./userThunk";
import { DecodeToken } from "types";

export type UserState = {
  instructors: Instructor[];
  payload: DecodeToken<JWTPayload, UserMetadata>;
};

const initialState: UserState = {
  payload: null,
  instructors: [],
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
    build.addCase(UserThunk.getPayload.fulfilled, (state, action) => {
      if (action.payload) {
        state.payload = action.payload;
      }
    });
    build.addCase(UserThunk.getInstructors.fulfilled, (state, action) => {
      state.instructors = action.payload;
    });
  },
});

export const UserActions = user.actions;
