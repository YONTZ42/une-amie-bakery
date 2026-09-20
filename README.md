# Boulangerie une Amie — Astro website

つくばのベーカリー「Boulangerie une Amie」のレスポンシブ・トップページです。

## 開発

```bash
npm install
npm run dev
```

## 本番ビルド

```bash
npm run build
```

Astroのソースは `src/` にあります。

## GitHub

`main` ブランチへのpushとPull Requestで、GitHub ActionsがNode.js 22上の本番ビルドを検証します。

## Cloudflare Workers

Cloudflare Workers Buildsでは次の設定を使用します。

- Production branch: `main`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: `/`

Astroの静的出力 `dist/client` は、`wrangler.jsonc` のStatic Assets設定で配信します。

- `src/pages/index.astro` — トップページ構成とコンテンツ
- `src/components/Header.astro` — PC／スマホ共通ヘッダー
- `src/components/SectionCurve.astro` — レスポンシブ対応の曲線区切り
- `src/styles/global.css` — カラー、余白、レスポンシブ、アニメーション
- `src/assets/images/` — 写真、ロゴ、女の子の線画

主なブレークポイントは `920px` と `620px` です。写真、文章、曲線を別レイヤーで実装しているため、写真を差し替えても曲線や文字組みが崩れません。
