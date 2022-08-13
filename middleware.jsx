import { NextRequest, NextResponse } from "next/server";

export function middleware(req) {
  const requestUrl = req.nextUrl.pathname;
  if (
    requestUrl.startsWith("/assets") ||
    requestUrl.startsWith("/_next") ||
    requestUrl.startsWith("/favicon") ||
    requestUrl.startsWith("/login")
  ) {
    return NextResponse.next();
  }

  if (!req.cookies.get("token")) {
    // console.log(req.nextUrl);
    const url = new URL(req.nextUrl.origin + "/login");
    // url.searchParams.set("next", req.nextUrl.pathname);
    let response = NextResponse.redirect(url);
    response.cookies.set(
      "flash",
      JSON.stringify({
        text: "Sesi Anda Habis, Mohon Untuk Login Kembali!",
        type: "error",
      })
    );
    response.cookies.set("nextUrl", req.nextUrl.pathname);
    return response;
  }

  // if (
  //   req.url.includes("api") ||
  //   req.url.includes("assets") ||
  //   req.url.includes("favicon") ||
  //   req.url.includes("login")
  // )
  //   return NextResponse.next();
  // if (!req.page.name) return NextResponse.next();
  // if (!req.cookies?.token)
  //   return NextResponse.redirect(req.nextUrl.origin + "/login");
  // return NextResponse.next();
}
