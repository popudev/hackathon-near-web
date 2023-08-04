import scoreService from "@/services/score";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const ScoreThunks = {
  getScoreByUserId: createAsyncThunk("score/get-by-user-id", async (user_id: string) => {
    const scores = await scoreService.getByUserId(user_id);
    return scores;
  }),

  getScoreBySubjectId: createAsyncThunk(
    "score/get-by-subject-id",
    async (subject_id: string) => {
      const scores = await scoreService.getBySubjectId(subject_id);
      return scores;
    }
  ),
};
