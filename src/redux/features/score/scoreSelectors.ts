import { createSelector } from "@reduxjs/toolkit";
import { ScoresState } from "./scoreSlice";

interface PartialScoreState {
  score: ScoresState;
}

const subjectStateSelector = (state: PartialScoreState) => state.score;

export const ScoreSelectors = {
  getScores: () => createSelector(subjectStateSelector, ({ scores }) => scores),
};
