# 🌟 OSS Gallery

オープンソースプロジェクトを紹介するシンプルなギャラリーアプリケーション

## 📝 概要

このアプリケーションは、素晴らしいオープンソースプロジェクトを紹介するためのギャラリーです。
シンプルな設計で、プロジェクトの一覧表示とクリック数の追跡機能を提供します。

## 🚀 機能

- ✨ プロジェクト一覧の表示
- 🔗 GitHubへの直接リンク
- 📊 クリック数の追跡
- 🎨 グラデーションを用いた美しいUI

## 🛠️ 動作環境

- 💻 Node.js 18以上
- 🗃️ PostgreSQL 12以上

## 🔧 セットアップ手順

### 1. データベースの準備

PostgreSQLをインストールし、新しいデータベースを作成します：

```sql
CREATE DATABASE oss_gallery;
```

### 2. プロジェクトのセットアップ

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/oss-gallery.git
cd oss-gallery

# 依存関係のインストール
npm install

# 環境変数の設定
# .envファイルを作成し、以下の内容を設定：
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/oss_gallery"

# データベースのマイグレーションとシード
npm run db:generate
npm run db:push
npm run db:seed
```

### 3. アプリケーションの起動

```bash
# 開発サーバーの起動
npm run dev
```

ブラウザで http://localhost:3000 を開いてアプリケーションにアクセスできます。

## 📈 使い方

1. トップページでプロジェクト一覧を確認
2. 興味のあるプロジェクトをクリック
3. GitHubページに自動的に遷移

## 🔍 開発者向け情報

### プロジェクトの追加方法

`prisma/seed.ts`を編集してプロジェクトを追加できます：

```typescript
{
  name: "プロジェクト名",
  description: "プロジェクトの説明",
  url: "GitHubのURL",
  logo: "ロゴ画像のURL",
  stars: スター数,
  gradient: "グラデーション設定"
}
```

### ディレクトリ構造

```
oss-gallery/
├── app/                 # Next.js アプリケーションコード
│   ├── api/            # APIエンドポイント
│   └── page.tsx        # メインページ
├── components/         # Reactコンポーネント
├── prisma/            # データベース関連
└── public/            # 静的ファイル
```

## 🐛 トラブルシューティング

### データベース接続エラー
- PostgreSQLが起動していることを確認
- `.env`の接続情報が正しいことを確認

### ビルドエラー
- Node.jsのバージョンを確認
- `npm install`を再実行

## 📝 ライセンス

MITライセンスで提供されています。

---

詳しい情報や更新については、[GitHubリポジトリ](https://github.com/yourusername/oss-gallery)をご覧ください。
