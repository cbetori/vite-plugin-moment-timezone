import { expect, it, describe } from 'vitest';
import { momentTimezonePlugin, transformMomentTimezone } from '../src/plugin';

type Transform = (code: string, id: string) => string;

describe('moment-timezone plugin', () => {
  it('We should return a valid plugin', () => {
    const plugin = momentTimezonePlugin({ zones: ['America/Los_Angeles'] });
    const transform = plugin.transform as Transform;
    const result = transform('', 'moment-timezone/data/packed/latest.json');
    expect(plugin).toBeDefined();
    expect(transform).toBeDefined();
    expect(result).toBeDefined();
  });
  it('We should only include one zone', () => {
    const result = transformMomentTimezone(['America/Los_Angeles']);
    if (result === undefined) {
      throw new Error('Result is undefined');
    }
    expect(result.version).toBeDefined();
    expect(result.zones.length).toEqual(1);
    expect(result.links.length).toEqual(1);
    expect(result.countries.length).toEqual(1);
    expect(result.zones[0]).toContain('America/Los_Angeles');
    expect(result.links[0]).toContain('America/Los_Angeles');
    expect(result.countries[0]).toContain('America/Los_Angeles');
  });
});
