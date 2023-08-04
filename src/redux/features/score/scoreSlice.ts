import { createSlice } from "@reduxjs/toolkit";
import { Score } from "@/services/major/types";
import { ScoreThunks } from "./scoreThunk";

export type ScoresState = {
  scores: Score[];
};

const initialState: ScoresState = {
  scores: [],
};

export const score = createSlice({
  name: "Score",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ScoreThunks.getScoreByUserId.fulfilled, (state, action) => {
      state.scores = action.payload;
    });

    builder.addCase(ScoreThunks.getScoreBySubjectId.fulfilled, (state, action) => {
      state.scores = action.payload;
    });
  },
});

export const ScoreActions = score.actions;
