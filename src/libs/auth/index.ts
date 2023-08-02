"use server";
import { jwtVerify } from "jose";

export async function verifyJwtToken(token) {
  try {
    if (process.env.SECRET_KEY) {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.SECRET_KEY)
      );
      return payload;
    }
  } catch (err) {
    return null;
  }
}
