import { createSelector } from "@reduxjs/toolkit";
import { UserState } from "./userSlice";

interface PartialUserState {
  user: UserState;
}

const userStateSelector = (state: PartialUserState) => state.user;

export const UserSelectors = {
  getUser: () => createSelector(userStateSelector, ({ payload }) => payload),
  getInstructors: () => createSelector(userStateSelector, (user) => user.instructors),
};
