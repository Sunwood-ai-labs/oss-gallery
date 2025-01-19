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
      className="group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl card-shimmer"
    >
      <div
        className={`aspect-[5/2] w-full rounded-t-xl bg-gradient-to-tr ${gradient} gradient-animation group-hover:opacity-90 transition-opacity duration-300`}
      />
      <div className="-mt-8 flex items-center justify-between px-2">
        <div className="relative">
          <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-tr from-blue-100 to-purple-100 opacity-75"></div>
          <Image
            src={logo}
            alt={name}
            width={100}
            height={100}
            className="relative h-16 w-16 rounded-full bg-white p-2 transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="flex items-center space-x-2 rounded-lg border border-gray-200 bg-white/95 px-3 py-1 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:border-gray-300 group-hover:shadow-md">
          <Star className="h-4 w-4 text-gray-600 transition-colors group-hover:text-yellow-500" />
          <p className="text-sm font-medium text-gray-600 transition-colors group-hover:text-gray-900">
            {formatNumber(stars)}
          </p>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-blue-600">
          {name}
        </h2>
        <p className="mt-2 line-clamp-3 text-sm text-gray-500 transition-colors group-hover:text-gray-600">
          {description}
        </p>
      </div>
    </a>
  );
}
