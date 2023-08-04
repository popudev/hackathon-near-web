import { createSelector } from "@reduxjs/toolkit";
import { ScoresState } from "./scoreSlice";

interface PartialScoreState {
  score: ScoresState;
}

const scoreSelectors = (state: PartialScoreState) => state.score;

export const ScoreSelectors = {
  getScores: () => createSelector(scoreSelectors, ({ scores }) => scores),
};
