"use server";
import { JWTPayload, jwtVerify } from "jose";
import { DecodeToken } from "types";
import { UserMetadata } from "types/entities";

export async function verifyJwtToken(token): Promise<DecodeToken<JWTPayload, UserMetadata>> {
  try {
    if (process.env.SECRET_KEY) {
      const result = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET_KEY));
      return result.payload as DecodeToken<JWTPayload, UserMetadata>;
    }
  } catch (err) {
    return null;
  }
}
