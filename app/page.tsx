import prisma from "../lib/prisma";
import ProjectCard from "../components/projects/project-card";
import { type Project } from "@prisma/client";

export default async function Home() {
  const projects = await prisma.project.findMany({
    orderBy: {
      stars: "desc",
    },
  });

  return (
    <main className="mx-auto max-w-screen-xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          OSS Gallery
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          オープンソースプロジェクトのショーケース
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </main>
  );
}
