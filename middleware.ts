import { auth } from "./auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth();

  // ダッシュボード関連のパスの保護
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // プロジェクト編集機能の保護
  if (request.nextUrl.pathname.startsWith("/projects") && 
      (request.method === "POST" || request.method === "PUT" || request.method === "DELETE")) {
    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: "認証が必要です" }),
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/projects/:path*"
  ]
};
