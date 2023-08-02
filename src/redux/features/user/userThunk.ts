import majorService, { MajorService } from "@/services/major";
import subjectService from "@/services/subject";
import { userService } from "@/services/user";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const UserThunks = {
  getInstructors: createAsyncThunk("instructor", async () => {
    const instructors = await userService.getAllInstructor();
    return instructors;
  }),
};
