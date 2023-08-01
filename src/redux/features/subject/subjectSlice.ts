import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Major } from "@/services/major/types";
import { Subject } from "@/services/subject/type";
import { SubjectThunks } from "./subjectThunk";

export type SubjectState = {
  subjects: Subject[];
};

const initialState: SubjectState = {
  subjects: [
    {
      subject_id: "1",
      instructor_id: "1",
      prerequisite_subject_id: "159753",
      thumbnail: "/static/images/software-development.jpg",
      title: "Giáo dục công dân",
      description: "Dạy cách làm người",
      number_of_credits: 8,
      price: 100000,
      number_students_studying: 4,
      created_at: Date.now(),
      updated_at: Date.now(),
    },
    {
      subject_id: "1",
      instructor_id: "1",
      prerequisite_subject_id: "159753",
      thumbnail: "/static/images/software-development.jpg",
      title: "Giáo dục công dân",
      description: "Dạy cách làm người",
      number_of_credits: 8,
      price: 100000,
      number_students_studying: 4,
      created_at: Date.now(),
      updated_at: Date.now(),
    },
    {
      subject_id: "1",
      instructor_id: "1",
      prerequisite_subject_id: "159753",
      thumbnail: "/static/images/software-development.jpg",
      title: "Giáo dục công dân",
      description: "Dạy cách làm người",
      number_of_credits: 8,
      price: 100000,
      number_students_studying: 4,
      created_at: Date.now(),
      updated_at: Date.now(),
    },
  ],
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
