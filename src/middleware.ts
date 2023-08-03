import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verifyJwtToken } from "@/libs/auth";
import { JWTPayload } from "jose";
import { UserMetadata } from "types/entities";
import { DecodeToken } from "types";
import { Roles } from "types";
const config = {
  requiredToken: ["/hello"],
  requiredRole: {
    [Roles[Roles.Admin]]: { paths: ["/admin"], redirect: "/" },
    [Roles[Roles.Instructor]]: { paths: ["/instructor"], redirect: "/" },
    [Roles[Roles.Student]]: { paths: ["/student"], redirect: "/" },
  },
};
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { requiredToken, requiredRole } = config;

  const cookie = request.cookies.get("accessToken");
  if (request.nextUrl.pathname.startsWith("/_next")) return NextResponse.next();
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
        for (const path of info.paths) {
          if (request.nextUrl.pathname.startsWith(path)) {
            //console.log("ok");

            return NextResponse.next();
          } else {
            //console.log("ko");
            return NextResponse.redirect(new URL(info.redirect, request.url));
            //throw new Error(info.redirect);
            // return NextResponse.redirect(new URL("/x", request.url));
          }
        }
      } else {
        throw new Error("Invalid role or path");
      }

      // requiredRole.forEach((_role, paths) => {
      //   // console.log();
      //   switch (role) {
      //     case Roles[Roles.Admin]:
      //       // if(_role[Roles.Admin]?.includes(request.nextUrl.pathname))
      //       console.log(paths);
      //       return;
      //     case Roles[Roles.Instructor]:
      //       break;
      //     case Roles[Roles.Student]:
      //     default:
      //       break;
      //   }
      // });
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
