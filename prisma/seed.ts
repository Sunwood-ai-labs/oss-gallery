import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const projects = [
  {
    name: "Next.js",
    description: "The React Framework for the Web",
    url: "https://github.com/vercel/next.js",
    logo: "https://assets.vercel.com/image/upload/v1662130559/nextjs/icon.png",
    stars: 114000,
    gradient: "from-purple-100 via-violet-50 to-blue-100"
  },
  {
    name: "React",
    description: "The library for web and native user interfaces",
    url: "https://github.com/facebook/react",
    logo: "https://reactjs.org/favicon.ico",
    stars: 215000,
    gradient: "from-green-100 via-green-50 to-blue-100"
  },
  {
    name: "TypeScript",
    description: "JavaScript with syntax for types",
    url: "https://github.com/microsoft/TypeScript",
    logo: "https://www.typescriptlang.org/favicon.ico",
    stars: 94000,
    gradient: "from-blue-100 via-blue-50 to-cyan-100"
  }
];

async function main() {
  console.log("Seeding database...");

  // データベースをクリア
  await prisma.clickEvent.deleteMany();
  await prisma.project.deleteMany();

  // プロジェクトを作成
  for (const project of projects) {
    await prisma.project.create({
      data: project,
    });
  }

  console.log("Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
