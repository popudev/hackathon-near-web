import { createSelector } from "@reduxjs/toolkit";
import { MajorState } from "./majorSlice";

interface PartialMajorState {
  major: MajorState;
}

const majorStateSelector = (state: PartialMajorState) => state.major;

export const MajorSelectors = {
  getMajors: () => createSelector(majorStateSelector, (major) => major.majors),
};
