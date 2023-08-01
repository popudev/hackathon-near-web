import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Major } from "@/services/major/types";
import { MajorThunks } from "./majorThunk";

export type MajorState = {
  majors: Major[];
};

const initialState: MajorState = {
  majors: [
    {
      major_id: "1",
      name: "Công nghệ thông tin",
      description: "",
      thumbnail: "/static/images/information-technology.jpg",
      number_of_credits_required: 100,
      number_students: 0,
      created_at: Date.now(),
      updated_at: Date.now(),
    },
    {
      major_id: "2",
      name: "Kỹ thuật phần mềm",
      description: "",
      thumbnail: "/static/images/software-development.jpg",
      number_of_credits_required: 100,
      number_students: 0,
      created_at: Date.now(),
      updated_at: Date.now(),
    },
    {
      major_id: "3",
      name: "Quản trị kinh doanh",
      description: "",
      thumbnail: "/static/images/business-administration.jpg",
      number_of_credits_required: 100,
      number_students: 0,
      created_at: Date.now(),
      updated_at: Date.now(),
    },
  ],
};

export const major = createSlice({
  name: "Major",
  initialState,
  reducers: {
    addMajor(state, action: PayloadAction<Major>) {
      state.majors.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(MajorThunks.getMajors.fulfilled, (state, action) => {
      state.majors = action.payload;
    });
  },
});

export const MajorActions = major.actions;
