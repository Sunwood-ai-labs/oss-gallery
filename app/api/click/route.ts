import { recordClickEvent } from "../../../lib/urls";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { projectId, linkId } = await req.json();

    // プロジェクトとリンクの存在確認
    const [project, link] = await Promise.all([
      prisma.project.findUnique({
        where: { id: projectId },
      }),
      prisma.link.findUnique({
        where: { id: linkId },
      }),
    ]);

    if (!project || !link) {
      return NextResponse.json(
        { error: "Project or Link not found" },
        { status: 404 }
      );
    }

    // プロジェクトとリンクの関連性を確認
    if (link.projectId !== projectId) {
      return NextResponse.json(
        { error: "Invalid project and link combination" },
        { status: 400 }
      );
    }

    // クリックイベントを記録
    const clickEvent = await recordClickEvent({
      projectId,
      linkId,
      req,
    });

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
