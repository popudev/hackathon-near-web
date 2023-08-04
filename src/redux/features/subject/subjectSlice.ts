import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Major } from "@/services/major/types";
import { Subject } from "@/services/subject/type";
import { SubjectThunks } from "./subjectThunk";

export type SubjectState = {
  subjects: Subject[];
  subjectsByUserId: Subject[];
};

const initialState: SubjectState = {
  subjects: [],
  subjectsByUserId: [],
};

export const subject = createSlice({
  name: "Subject",
  initialState,
  reducers: {
    addSubject(state, action: PayloadAction<Subject>) {
      state.subjects.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(SubjectThunks.getSubjects.fulfilled, (state, action) => {
      state.subjects = action.payload;
    });

    builder.addCase(SubjectThunks.getSubjectsByUserId.fulfilled, (state, action) => {
      state.subjectsByUserId = action.payload;
    });
  },
});

export const SubjectActions = subject.actions;
