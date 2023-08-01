import majorService, { MajorService } from "@/services/major";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const MajorThunks = {
  getMajors: createAsyncThunk("major", async () => {
    const majors = await majorService.getAll();
    return majors;
  }),
};
