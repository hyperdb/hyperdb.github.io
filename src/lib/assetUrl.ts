/**
 * assetUrlは、アセットのURLを生成するための関数です。
 * 環境変数VITE_ASSETS_BASE_URLを使用して、アセットのベースURLを指定できます。
 *
 * @param path アセットの相対パス
 * @returns アセットの完全なURL
 */
export const assetUrl = (path: string) => {
  const base = import.meta.env.VITE_ASSETS_BASE_URL ?? "";
  // 先頭スラッシュを正規化
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
};
export default assetUrl;
