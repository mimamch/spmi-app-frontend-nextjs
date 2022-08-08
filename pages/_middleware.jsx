import { NextRequest, NextResponse } from "next/server";

export default function _middleware(req) {
    if (
        req.url.includes("api") ||
        req.url.includes("assets") ||
        req.url.includes("favicon") ||
        req.url.includes("login")
      )
        return NextResponse.next();
      if (!req.page.name) return NextResponse.next();

      if (!req.cookies?.token) return NextResponse.redirect(req.nextUrl.origin + "/login");


}
