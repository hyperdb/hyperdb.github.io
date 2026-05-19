export const PAGE_ID = {
  HOME: "1WoQCG",
  PROFILE: "1WoQcN",
  BLOG: "1Wp0kW",
};

export const SITE_INFO = {
  TITLE: "hyperdb.github.io",
  SUB_TITLE: "老いに抗うプログラマの個人サイト",
  DESCRIPTION: "個人事業主として横浜で活動するプログラマの個人サイトです。",
  KEYWORDS: "プログラマ, 横浜, 個人サイト, 技術ブログ",
  URL: "https://hyperdb.github.io",
  AUTHOR: "hyperdb",
  YEARS: "2026",
  GITHUB_USERNAME: "hyperdb",
};

export type DrawerMenuItemType = {
  title: string;
  description: string;
  path: string;
  key: string;
};

export const DRAWER_MENU_ITEMS: DrawerMenuItemType[] = [
  {
    title: "ホーム",
    description: "トップページに移動します。",
    path: "/",
    key: PAGE_ID.HOME,
  },
  {
    title: "プロフィール",
    description: "プロフィールページに移動します。",
    path: "/profile",
    key: PAGE_ID.PROFILE,
  },
  {
    title: "ブログ一覧",
    description: "ブログ記事の一覧ページに移動します。",
    path: "/blog",
    key: PAGE_ID.BLOG,
  },
];
