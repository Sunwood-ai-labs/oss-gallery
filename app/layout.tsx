import type { Metadata } from "next";
import { inter } from "./fonts";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "OSS Gallery",
  description: "オープンソースプロジェクトのショーケース",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={cn(inter.variable)}>
      <body>
        <Providers>
          <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-100">
            <Navbar />
            <main className="mx-auto min-h-screen w-full max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
              {children}
            </main>
            <footer className="absolute bottom-0 w-full py-5 text-center">
              <p className="text-sm text-gray-500">
                Made with ❤️ by the community
              </p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
