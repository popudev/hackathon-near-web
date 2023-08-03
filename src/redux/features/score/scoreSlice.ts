import { createSlice } from "@reduxjs/toolkit";
import { Score } from "@/services/major/types";

type ScoresState = {
  scores: Score[];
};

const initialState: ScoresState = {
  scores: [
    {
      score_id: "1",
      subject_id: "1",
      student_id: "1",
      instuctor_id: "1",
      score: 9,
      created_at: Date.now(),
      updated_at: Date.now(),
    },
    {
      score_id: "2",
      subject_id: "2",
      student_id: "2",
      instuctor_id: "2",
      score: 9,
      created_at: Date.now(),
      updated_at: Date.now(),
    },
    {
      score_id: "3",
      subject_id: "3",
      student_id: "3",
      instuctor_id: "3",
      score: 9,
      created_at: Date.now(),
      updated_at: Date.now(),
    },
  ],
};

export const score = createSlice({
  name: "Score",
  initialState,
  reducers: {},
});

export const ScoreActions = score.actions;
