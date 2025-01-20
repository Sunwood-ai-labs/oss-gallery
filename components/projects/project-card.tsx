import { cn } from "@/lib/utils";
import { Project } from "@prisma/client";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const projectUrl = project.slug ? `/projects/${project.slug}` : `/projects/${project.id}`;

  return (
    <Link
      href={projectUrl}
      className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
    >
      <div
        className={cn(
          "aspect-[5/2] w-full bg-gradient-to-tr",
          project.gradient
        )}
      />
      <div className="-mt-8 flex items-center justify-between px-4">
        <div className="h-16 w-16 overflow-hidden rounded-full border-4 border-white bg-white">
          <Image
            src={project.logo}
            alt={project.name}
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex items-center space-x-1 rounded-full border border-gray-200 bg-white px-3 py-1 text-sm">
          <Star className="h-4 w-4" />
          <span>{project.stars.toLocaleString()}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display text-xl font-bold">{project.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
          {project.description}
        </p>
        {project.tags && project.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-black/[0.01] to-black/[0.06] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
    </Link>
  );
}
