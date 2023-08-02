import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Major } from "@/services/major/types";
import { Subject } from "@/services/subject/type";
import { SubjectThunks } from "./subjectThunk";

export type SubjectState = {
  subjects: Subject[];
};

const initialState: SubjectState = {
  subjects: [],
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
  },
});

export const SubjectActions = subject.actions;
