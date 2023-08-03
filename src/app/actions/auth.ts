"use server";

import { cookies } from "next/headers";

export async function signIn(accessToken: string) {
  cookies().set("accessToken", accessToken, {
    secure: true,
    httpOnly: true,
  });
}

export async function getToken() {
  return cookies().get("accessToken")?.value || null;
}
