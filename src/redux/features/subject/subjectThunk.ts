import majorService, { MajorService } from "@/services/major";
import subjectService from "@/services/subject";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const SubjectThunks = {
  getSubjects: createAsyncThunk("subject/get-all", async () => {
    const subjects = await subjectService.getAll();
    return subjects;
  }),

  getSubjectsByUserId: createAsyncThunk("subject/get-by-id", async (user_id: string) => {
    const subjects = await subjectService.getByUserId(user_id);
    return subjects;
  }),
};
