import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">ダッシュボード</h1>
      
      <div className="grid gap-6">
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">プロフィール情報</h2>
            <div className="space-y-2">
              <div>
                <span className="font-medium">名前: </span>
                {session.user.name || "未設定"}
              </div>
              <div>
                <span className="font-medium">メールアドレス: </span>
                {session.user.email}
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">あなたのプロジェクト</h2>
            <div className="text-gray-500">
              プロジェクトはまだ登録されていません。
              「プロジェクト」メニューから新しいプロジェクトを登録できます。
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
