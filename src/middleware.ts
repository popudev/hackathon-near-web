import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verifyJwtToken } from "@/libs/auth";
import { JWTPayload } from "jose";
import { UserMetadata } from "types/entities";
import { DecodeToken } from "types";
import { Roles } from "types";
const config = {
  requiredToken: ["/admin", "/instructor", "/student"],
  requiredRole: {
    [Roles[Roles.Admin]]: {
      paths: ["/admin", "/", "/register"],
      redirect: "/admin/majors",
      main: "/admin/majors",
    },
    [Roles[Roles.Instructor]]: {
      paths: ["/instructor", "register", "/"],
      redirect: "/instructor/subjects",
      main: "/instructor/subjects",
    },
    [Roles[Roles.Student]]: {
      paths: ["/student", "register", "/"],
      redirect: "/student/subjects",
      main: "/student/subjects",
    },
  },
};
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { requiredToken, requiredRole } = config;

  const cookie = request.cookies.get("accessToken");
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/static")
  )
    return NextResponse.next();
  if (request.nextUrl.pathname.startsWith("/logout")) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("accessToken");
    return response;
  }

  if (cookie?.value) {
    const result = (await verifyJwtToken(cookie.value)) as DecodeToken<
      JWTPayload,
      UserMetadata
    >;

    // INFO: case wrong token
    if (!result) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("accessToken");
      return response;
    }

    // INFO: handle role
    const role = result?.role;
    if (role) {
      const info = requiredRole[role];
      //console.log(paths, request.nextUrl.pathname);
      if (info.paths) {
        // for (const path of info.paths) {
        const isCorrect = (path: string) => {
          if (path == "/") {
            console.log(request.nextUrl.pathname, path);

            return request.nextUrl.pathname === "/";
          } else {
            return request.nextUrl.pathname.startsWith(path);
          }
        };
        if (info.paths.some(isCorrect)) {
          return NextResponse.next();
        } else {
          return NextResponse.redirect(new URL(info.redirect, request.url));
        }
      } else {
        throw new Error("Invalid role or path");
      }
    }

    // INFO: case has token when go to login  => redirect to home
    if (request.nextUrl.pathname.startsWith("/login")) {
      if (result.role) return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    // INFO: case for route need token
    if (requiredToken.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
