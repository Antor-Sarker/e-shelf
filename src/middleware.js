import { NextResponse } from "next/server";

export default async function middleware(request) {
  try {
    const res = await fetch(new URL("/api/auth/verifyToken", request.url), {
      headers: {
        Cookie: `token=${request.cookies.get("token").value}`,
      },
    });
    const data = await res.json();

    if (data) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/auth/login", request.url));
  } catch (error) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
