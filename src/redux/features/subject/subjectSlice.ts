import { createSlice } from "@reduxjs/toolkit";
import { Subject } from "@/services/major/types";

type SubjectState = {
  subjects: Subject[];
};

const initialState: SubjectState = {
  subjects: [
    {
      subject_id: "1",
      instructor_id: "1",
      prerequisite_subject_id: "1",
      thumbnail: "/static/images/information-technology.jpg",
      title: "Cấu trúc dữ liệu và giải thuật",
      description: "",
      number_of_credits: 4,
      price: 500,
      number_students_studying: 5,
      created_at: Date.now(),
      updated_at: Date.now(),
    },
    {
      subject_id: "2",
      instructor_id: "2",
      prerequisite_subject_id: "2",
      thumbnail: "/static/images/software-development.jpg",
      title: "Cơ sở dữ liệu",
      description: "",
      number_of_credits: 3,
      price: 300,
      number_students_studying: 5,
      created_at: Date.now(),
      updated_at: Date.now(),
    },
    {
      subject_id: "3",
      instructor_id: "3",
      prerequisite_subject_id: "3",
      thumbnail: "/static/images/business-administration.jpg",
      title: "Giải tích",
      description: "",
      number_of_credits: 3,
      price: 300,
      number_students_studying: 4,
      created_at: Date.now(),
      updated_at: Date.now(),
    },
  ],
};

export const subject = createSlice({
  name: "Subject",
  initialState,
  reducers: {},
});

export const SubjectActions = subject.actions;
