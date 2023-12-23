import { describe, expect, test } from 'vitest';
import { init } from '.';

describe('multilingual', () => {
  test('create Provider', () => {
    const zh = {
      hello: 'hello'
    };
    const res = init({ resources: { zh }, lang: 'zh' });
    expect(res).toHaveProperty('Provider');
    expect(res).toHaveProperty('useLang');
  });
});
