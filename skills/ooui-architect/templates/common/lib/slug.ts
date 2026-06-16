/** サンプル用 — 実装時はプロジェクトの src/common/lib/ へ */
export function toSlug(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, '-');
}
