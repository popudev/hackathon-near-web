import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserMetadata } from "types/entities";
import { UserThunk } from "./userThunk";
import { JWTPayload } from "jose";

export type UserState = { payload: JWTPayload | null };

const initialState: UserState = {
  payload: null,
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
  },
});

export const UserAction = user.actions;
