import { expect, it, describe } from 'vitest';
import { createRequire } from 'module';
import { momentTimezonePlugin, transformMomentTimezone } from '../src/plugin';
import moment from 'moment-timezone/moment-timezone-utils';
const require = createRequire(import.meta.url);
const data = require('moment-timezone/data/packed/latest.json');
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
    // @ts-ignore
    const zone = moment.tz.unpack(result.zones[0]);

    expect(result.version).toEqual(data.version);
    expect(result.zones.length).toEqual(1);
    expect(result.links.length).toEqual(1);
    expect(result.countries.length).toEqual(1);
    expect(result.zones[0]).toContain('America/Los_Angeles');
    expect(result.links[0]).toContain('America/Los_Angeles');
    expect(result.countries[0]).toContain('America/Los_Angeles');
    expect(zone.offsets.length).toEqual(1111);
  });
  it('We should be able to return all data', () => {
    const result = transformMomentTimezone(undefined, undefined, undefined);
    if (result === undefined) {
      throw new Error('Result is undefined');
    }
    expect(result.version).toEqual(data.version);
    expect(result.zones.length).toEqual(data.zones.length);
    expect(result.links.length).toEqual(data.links.length);
    expect(result.countries.length).toEqual(data.countries.length);
  });
  it('We should be able to use just a start date', () => {
    const result = transformMomentTimezone(['America/Los_Angeles'], 2012, undefined);
    if (result === undefined) {
      throw new Error('Result is undefined');
    }
    // @ts-ignore
    const zone = moment.tz.unpack(result.zones[0]);

    expect(result.version).toEqual(data.version);
    expect(result.zones.length).toEqual(1);
    expect(result.links.length).toEqual(1);
    expect(result.countries.length).toEqual(1);
    expect(zone.offsets.length).toEqual(3);
  });
  it('We should be able to use just a zone', () => {
    const result = transformMomentTimezone(['America/Los_Angeles'], undefined, undefined);
    if (result === undefined) {
      throw new Error('Result is undefined');
    }
    // @ts-ignore
    const zone = moment.tz.unpack(result.zones[0]);

    expect(result.version).toEqual(data.version);
    expect(result.zones.length).toEqual(1);
    expect(result.links.length).toEqual(1);
    expect(result.countries.length).toEqual(1);
    expect(zone.offsets.length).toEqual(1111);
  });
  it('We should be able to use just a end date', () => {
    const result = transformMomentTimezone(['America/Los_Angeles'], undefined, 2012);
    if (result === undefined) {
      throw new Error('Result is undefined');
    }
    // @ts-ignore
    const zone = moment.tz.unpack(result.zones[0]);

    expect(result.version).toEqual(data.version);
    expect(result.zones.length).toEqual(1);
    expect(result.links.length).toEqual(1);
    expect(result.countries.length).toEqual(1);
    expect(zone.offsets.length).toEqual(137);
  });
  it('We should be able to use start and end dates', () => {
    const result = transformMomentTimezone(['America/Los_Angeles'], 1800, 2100);
    if (result === undefined) {
      throw new Error('Result is undefined');
    }
    // @ts-ignore
    const zone = moment.tz.unpack(result.zones[0]);

    expect(result.version).toEqual(data.version);
    expect(result.zones.length).toEqual(1);
    expect(result.links.length).toEqual(1);
    expect(result.countries.length).toEqual(1);
    expect(zone.offsets.length).toEqual(313);
  });
});
