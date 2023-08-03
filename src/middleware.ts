import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verifyJwtToken } from "@/libs/auth";

const requiredToken = ["/", "/register"];
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get("accessToken");
  if (request.nextUrl.pathname.startsWith("/_next")) return NextResponse.next();
  if (request.nextUrl.pathname.startsWith("/logout")) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("accessToken");
    return response;
  }
  if (cookie?.value) {
    const result = await verifyJwtToken(cookie.value);
    if (!result) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("accessToken");
      return response;
    }

    if (request.nextUrl.pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (requiredToken.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
