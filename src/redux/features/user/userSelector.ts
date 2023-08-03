import { createSelector } from "@reduxjs/toolkit";
import { UserState } from "./userSlice";

const userStateSelector = (state: UserState) => state.payload;

export const userSelector = {
  getUser: () => createSelector(userStateSelector, (payload) => payload),
};
