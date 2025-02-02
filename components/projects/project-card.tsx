import { cn, nFormatter } from "@dub/utils";
import { Project, Link } from "@prisma/client";
import { BadgeCheck, Star } from "lucide-react";
import Image from "next/image";
import NextLink from "next/link";
import { buttonLinkVariants } from "../ui/button-link";

// クリックイベントを記録する関数
async function recordClick(projectId: string, linkId: string) {
  try {
    await fetch("/api/click", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectId, linkId }),
    });
  } catch (error) {
    console.error("Failed to record click:", error);
  }
}

// プロジェクトリンクコンポーネント
function ProjectLink({ 
  href, 
  projectId, 
  linkId, 
  children 
}: { 
  href: string;
  projectId: string;
  linkId: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        recordClick(projectId, linkId);
      }}
      className={buttonLinkVariants({ variant: "secondary" })}
    >
      {children}
    </a>
  );
}

type ProjectWithLinks = Project & {
  links: Link[];
};

export default function ProjectCard(project: ProjectWithLinks) {
  const githubLink = project.links.find((link) => link.type === "GITHUB");
  const websiteLink = project.links.find((link) => link.type === "WEBSITE");

  return (
    <NextLink
      href={`/projects/${project.slug}`}
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-transform will-change-transform hover:-translate-y-0.5 hover:shadow-xl"
    >
      <div
        className={cn(
          "aspect-[5/2] w-full rounded-t-xl bg-gradient-to-tr",
          project.gradient,
        )}
      />
      <div className="-mt-8 flex items-center justify-between px-2">
        <Image
          src={project.logo}
          alt={project.name}
          width={100}
          height={100}
          className="h-16 w-16 rounded-full bg-white p-2"
        />
        <div className="flex items-center space-x-2">
          {githubLink && (
            <ProjectLink
              href={githubLink.url}
              projectId={project.id}
              linkId={githubLink.id}
            >
              <Star className="h-4 w-4" />
              <p className="text-sm">{nFormatter(project.stars)}</p>
            </ProjectLink>
          )}
          {websiteLink && (
            <ProjectLink
              href={websiteLink.url}
              projectId={project.id}
              linkId={websiteLink.id}
            >
              <p className="text-sm">Website</p>
            </ProjectLink>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-1">
          <h2 className="font-display text-xl font-semibold">{project.name}</h2>
          {project.verified && (
            <BadgeCheck className="h-6 w-6 text-white" fill="#1c9bef" />
          )}
        </div>
        <p className="mt-2 line-clamp-3 text-sm text-gray-500">
          {project.description}
        </p>
      </div>
    </NextLink>
  );
}
