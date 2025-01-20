import ProjectCard from "@/components/projects/project-card";
import { buttonVariants } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { BookOpenText } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const projects = await prisma.project.findMany({
    orderBy: { stars: 'desc' }
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* ヒーローセクション */}
      <div className="relative z-10 mx-auto w-full max-w-xl px-5 py-16 text-center sm:py-20 md:py-28 xl:px-0">
        <a
          href="/projects"
          className="mx-auto mb-5 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 transition-all hover:bg-gray-50"
          style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
        >
          <BookOpenText className="h-5 w-5 text-gray-600" />
          <p className="text-sm font-semibold text-gray-600">
            プロジェクトを見る
          </p>
        </a>
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          オープンソース
          <br />
          プロジェクトの
          <br />
          ショーケース
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-lg"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          素晴らしいオープンソースプロジェクトを
          <br className="hidden sm:block" />
          共有・発見するためのプラットフォーム
        </p>
        <div
          className="mx-auto mt-10 flex animate-fade-up flex-col items-center justify-center gap-4 opacity-0 sm:flex-row"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          <Link
            href="/register"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
            )}
          >
            プロジェクトを登録
          </Link>
          <Link
            href="/projects"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "text-gray-700"
            )}
          >
            プロジェクトを探す
          </Link>
        </div>
      </div>

      {/* プロジェクト一覧 */}
      <div
        className="animate-fade-up opacity-0"
        style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
      >
        <h2 className="mb-8 text-center font-display text-3xl font-bold">
          人気のプロジェクト
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
