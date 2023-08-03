import { createSelector } from "@reduxjs/toolkit";
import { SubjectState } from "./subjectSlice";

interface PartialSubjectState {
  subject: SubjectState;
}

const subjectStateSelector = (state: PartialSubjectState) => state.subject;

export const SubjectSelectors = {
  getSubjects: () => createSelector(subjectStateSelector, (subject) => subject.subjects),
  getSubjectById: (subject_id: string) =>
    createSelector(subjectStateSelector, (subject) =>
      subject.subjects.find((s) => s.subject_id === subject_id)
    ),
};
