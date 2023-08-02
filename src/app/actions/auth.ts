"use server";
import { verifyJwtToken } from "@/libs/auth";
import { cookies } from "next/headers";

export async function signIn(accessToken: string) {
  cookies().set("accessToken", accessToken, {
    secure: true,
    httpOnly: true,
  });
  const roles = await verifyJwtToken(accessToken);
  return roles;
}

export async function getToken() {
  return cookies().get("accessToken")?.value || null;
}
