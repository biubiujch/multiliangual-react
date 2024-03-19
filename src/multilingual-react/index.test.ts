import { describe, expect, test } from 'vitest';
import { init } from '.';

describe('multilingual', () => {
  test('create Provider', () => {
    const zh = {
      hello: 'hello'
    };
    const res = init({ resources: { zh }, lang: 'zh' });
    expect(res).toHaveProperty('useLang');
    expect(res).toHaveProperty('setLang');
    expect(res).toHaveProperty('getLang');
    expect(res).toHaveProperty('translate');
    expect(res.getLang()).toBe('zh');
  });
});
