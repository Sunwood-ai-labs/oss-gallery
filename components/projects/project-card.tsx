'use client';

import { Star } from "lucide-react";
import Image from "next/image";

import { type Project } from "@prisma/client";

type ProjectCardProps = Project;

// クリックイベントを記録する関数
async function recordClick(projectId: string) {
  try {
    await fetch("/api/click", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectId }),
    });
  } catch (error) {
    console.error("Failed to record click:", error);
  }
}

export default function ProjectCard({
  id,
  name,
  description,
  logo,
  gradient,
  stars,
  url,
}: ProjectCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => recordClick(id)}
      className="block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-transform hover:-translate-y-0.5 hover:shadow-xl"
    >
      <div
        className={`aspect-[5/2] w-full rounded-t-xl bg-gradient-to-tr ${gradient}`}
      />
      <div className="-mt-8 flex items-center justify-between px-2">
        <Image
          src={logo}
          alt={name}
          width={100}
          height={100}
          className="h-16 w-16 rounded-full bg-white p-2"
        />
        <div className="flex items-center space-x-2 rounded-lg border border-gray-200 bg-white px-3 py-1">
          <Star className="h-4 w-4 text-gray-600" />
          <p className="text-sm text-gray-600">{formatNumber(stars)}</p>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="mt-2 line-clamp-3 text-sm text-gray-500">
          {description}
        </p>
      </div>
    </a>
  );
}
