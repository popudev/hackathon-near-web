import { verifyJwtToken } from "@/libs/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import majorService, { MajorService } from "@/services/major";
import subjectService from "@/services/subject";
import { userService } from "@/services/user";

export const UserThunk = {
  getPayload: createAsyncThunk("user", async (accessToken: string) => {
    const result = await verifyJwtToken(accessToken);
    return result;
  }),
  getInstructors: createAsyncThunk("instructor", async () => {
    const instructors = await userService.getAllInstructor();
    return instructors;
  }),
  assignSubject: createAsyncThunk(
    "instructor/assignment",
    async (assigment: { instructor_id: string; subject_id: string; price: number }) => {
      const { instructor_id, subject_id, price } = assigment;
      return userService.assignSubject(instructor_id, subject_id, price);
    }
  ),
};
