import { createSelector } from "@reduxjs/toolkit";
import { UserState } from "./userSlice";

interface PartialUserState {
  user: UserState;
}

const userStateSelector = (state: PartialUserState) => state.user;

export const UserSelectors = {
  getInstructors: () => createSelector(userStateSelector, (user) => user.instructors),
};
