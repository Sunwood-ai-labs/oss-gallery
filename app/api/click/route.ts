import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

interface ClickRequest {
  projectId: string;
}

export async function POST(req: NextRequest) {
  try {
    const { projectId } = await req.json() as ClickRequest;

    // プロジェクトの存在確認
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // クリックイベントを記録
    const [clickEvent] = await Promise.all([
      prisma.clickEvent.create({
        data: {
          projectId,
          userAgent: req.headers.get("user-agent") ?? null,
          referer: req.headers.get("referer") ?? null,
          ip: (req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? null)?.toString(),
        },
      }),
      prisma.project.update({
        where: { id: projectId },
        data: {
          clicks: {
            increment: 1,
          },
        },
      }),
    ]);

    return NextResponse.json({ success: true, clickEvent });
  } catch (error) {
    console.error("Click event recording error:", error);
    return NextResponse.json(
      { error: "Failed to record click event" },
      { status: 500 }
    );
  }
}

// APIのヘルスチェック用
export async function GET() {
  return NextResponse.json({ status: "ok" });
}
