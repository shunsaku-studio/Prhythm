/**
 * common ユニットテストの書き方サンプル。
 * テストランナー未導入のプロジェクトでは参考用。導入後に bun:test / vitest 等で実行する。
 */

import { toSlug } from './slug';
import { describe, expect, test } from 'bun:test';

describe('toSlug', () => {
  test('lowercases and hyphenates', () => {
    expect(toSlug('Hello World')).toBe('hello-world');
  });

  test('trims edges', () => {
    expect(toSlug('  foo  ')).toBe('foo');
  });
});
