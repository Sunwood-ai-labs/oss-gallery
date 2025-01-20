import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { z } from "zod";
import { Prisma } from "@prisma/client";

// 入力バリデーションスキーマ
const registerSchema = z.object({
  name: z.string().min(1, "名前は必須です"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上である必要があります"),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = registerSchema.parse(json);

    // メールアドレスの重複チェック
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "このメールアドレスは既に登録されています" },
        { status: 400 }
      );
    }

    // 新規ユーザーの作成
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password, // パスワードは既にハッシュ化されています
      },
    });

    // パスワードを除外してユーザー情報を返す
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json(
      { 
        message: "ユーザーが正常に登録されました",
        user: userWithoutPassword 
      }, 
      { status: 201 }
    );

  } catch (error) {
    console.error("Registration error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: "このメールアドレスは既に使用されています" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: "ユーザー登録に失敗しました" },
      { status: 500 }
    );
  }
}
