import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Tailwind CSSのクラス名を結合するためのユーティリティ
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 数値をフォーマットするユーティリティ
export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

// スラッグを生成するユーティリティ
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// メタデータを構築するユーティリティ
export function constructMetadata({
  title = "OSS Gallery",
  description = "オープンソースプロジェクトのショーケース",
  image = "/thumbnail.jpg",
}: {
  title?: string;
  description?: string;
  image?: string;
} = {}) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@yourusername",
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}
