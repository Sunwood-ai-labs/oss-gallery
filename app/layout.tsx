import React from "react";
import "./globals.css";

export const metadata = {
  title: "OSS Gallery",
  description: "オープンソースプロジェクトのショーケース",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
