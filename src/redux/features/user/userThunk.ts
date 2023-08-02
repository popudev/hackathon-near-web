import { verifyJwtToken } from "@/libs/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const UserThunk = {
  getPayload: createAsyncThunk("user", async (accessToken: string) => {
    const result = await verifyJwtToken(accessToken);
    return result;
  }),
};
