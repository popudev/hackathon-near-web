import { createSelector } from "@reduxjs/toolkit";
import { SubjectState } from "./subjectSlice";

interface PartialSubjectState {
  subject: SubjectState;
}

const subjectStateSelector = (state: PartialSubjectState) => state.subject;

export const SubjectSelectos = {
  getSubjects: () => createSelector(subjectStateSelector, (subject) => subject.subjects),
};
