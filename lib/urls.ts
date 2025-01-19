import { LinkType } from "@prisma/client";
import prisma from "./prisma";

// プロジェクトのリンクを作成
export async function createProjectLink({
  url,
  type,
  projectId,
}: {
  url: string;
  type: LinkType;
  projectId: string;
}) {
  return await prisma.link.create({
    data: {
      url,
      type,
      projectId,
    },
  });
}

// プロジェクトのリンクを更新
export async function updateProjectLink({
  id,
  url,
}: {
  id: string;
  url: string;
}) {
  return await prisma.link.update({
    where: { id },
    data: { url },
  });
}

// クリックイベントを記録
export async function recordClickEvent({
  projectId,
  linkId,
  req,
}: {
  projectId: string;
  linkId: string;
  req: Request;
}) {
  const userAgent = req.headers.get("user-agent");
  const referer = req.headers.get("referer");
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip");
  // TODO: GeoIPなどを使用して国情報を取得する場合はここで実装

  const [clickEvent, project] = await Promise.all([
    prisma.clickEvent.create({
      data: {
        projectId,
        linkId,
        userAgent: userAgent || null,
        referer: referer || null,
        ip: ip?.toString() || null,
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

  return clickEvent;
}

// 指定期間のクリック数を集計
export async function getClickAnalytics({
  projectId,
  startDate,
  endDate,
  interval = "day",
}: {
  projectId: string;
  startDate: Date;
  endDate: Date;
  interval?: "hour" | "day" | "week" | "month";
}) {
  const clicks = await prisma.clickEvent.groupBy({
    by: ["linkId", "createdAt"],
    where: {
      projectId,
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    _count: {
      id: true,
    },
  });

  // 集計データを整形
  const analytics = clicks.map((click) => ({
    linkId: click.linkId,
    date: click.createdAt,
    clicks: click._count.id,
  }));

  return analytics;
}
