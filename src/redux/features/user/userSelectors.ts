import { createSelector } from "@reduxjs/toolkit";
import { UserState } from "./userSlice";

interface PartialUserState {
  user: UserState;
}

const userStateSelector = (state: PartialUserState) => state.user;

export const UserSelectors = {
  getUser: () => createSelector(userStateSelector, ({ payload }) => payload),

  getStudents: () => createSelector(userStateSelector, ({ students }) => students),

  getInstructors: () => createSelector(userStateSelector, ({ instructors }) => instructors),

  getInstructorsActive: () =>
    createSelector(userStateSelector, (user) =>
      user.instructors.filter((instructor) => instructor.active)
    ),
};
