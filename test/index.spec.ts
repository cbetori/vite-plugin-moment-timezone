import { expect, it, describe } from 'vitest';
import momentTimezonePlugin from '../src/index';

describe('moment-timezone plugin import ', () => {
  it('We should return a valid plugin', () => {
    const plugin = momentTimezonePlugin({});
    expect(plugin).toBeDefined();
    expect(plugin.name).toBe('vite-plugin-moment-timezone');
    expect(plugin.apply).toBe('build');
    expect(plugin.transform).toBeDefined();
  });
});
