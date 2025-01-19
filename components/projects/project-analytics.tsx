import { getClickAnalytics } from "../../lib/urls";
import { EnrichedProjectProps } from "../../lib/types";
import { LoadingSpinner } from "@dub/ui";
import { Suspense } from "react";
import ProjectAnalyticsClient from "./project-analytics-client";

export default function ProjectAnalytics({
  project,
}: {
  project: EnrichedProjectProps;
}) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProjectAnalyticsRSC project={project} />
    </Suspense>
  );
}

async function ProjectAnalyticsRSC({
  project,
}: {
  project: EnrichedProjectProps;
}) {
  const { links } = project;

  // プロジェクトが作成されて3日以内かどうかをチェック
  const newlyAddedProject =
    new Date(project.createdAt).getTime() >
    Date.now() - 3 * 24 * 60 * 60 * 1000;

  // クリック分析データの取得
  const endDate = new Date();
  const startDate = new Date();
  if (newlyAddedProject) {
    startDate.setDate(startDate.getDate() - 3); // 3日前から
  } else {
    startDate.setDate(startDate.getDate() - 30); // 30日前から
  }

  const analytics = await getClickAnalytics({
    projectId: project.id,
    startDate,
    endDate,
    interval: newlyAddedProject ? "hour" : "day",
  });

  // リンクごとのクリック数を日付でグループ化
  const clicksByDate = new Map();
  
  analytics.forEach((click) => {
    const dateStr = new Date(click.date).toLocaleDateString(
      "en-US",
      newlyAddedProject
        ? {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          }
        : {
            month: "short",
            day: "numeric",
          },
    );

    if (!clicksByDate.has(dateStr)) {
      clicksByDate.set(dateStr, {});
    }
    
    const link = links.find(l => l.id === click.linkId);
    if (link) {
      clicksByDate.get(dateStr)[link.type] = click.clicks;
    }
  });

  // チャートデータの形式に変換
  const chartData = Array.from(clicksByDate.entries()).map(([date, clicks]) => ({
    start: date,
    ...clicks,
  }));

  return (
    <ProjectAnalyticsClient
      chartData={chartData}
      categories={links.map(l => l.type)}
      startEndOnly={newlyAddedProject}
    />
  );
}
