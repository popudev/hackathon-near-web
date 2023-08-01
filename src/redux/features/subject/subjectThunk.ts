import majorService, { MajorService } from "@/services/major";
import subjectService from "@/services/subject";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const SubjectThunks = {
  getSubjects: createAsyncThunk("major", async () => {
    const subjects = await subjectService.getAll();
    console.log("subjects: ", subjects);
    return subjects;
  }),
};
