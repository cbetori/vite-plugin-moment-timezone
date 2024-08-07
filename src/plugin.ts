import { createRequire } from 'module';
import type { Plugin } from 'vite';
const require = createRequire(import.meta.url);

export function momentTimezonePlugin(options: {
  zones?: string[] | undefined;
  startYear?: number | undefined;
  endYear?: number | undefined;
}): Plugin {
  return {
    name: 'vite-plugin-moment-timezone',
    apply: 'build',
    transform(code, id) {
      if (id.includes('moment-timezone/data/packed/latest.json')) {
        const transformedResult = transformMomentTimezone(
          options.zones,
          options.startYear,
          options.endYear,
        );
        return `export default ${JSON.stringify(transformedResult)}`;
      }
    },
  };
}

export function transformMomentTimezone(
  tz: string[] | undefined = [],
  startYear?: number,
  endYear?: number | undefined,
) {
  const tzdata = require('moment-timezone/data/packed/latest.json');
  const utils = require('moment-timezone/moment-timezone-utils');

  const zones: string[] = [];
  const links: string[] = [];
  const countries: string[] = [];

  if (tz?.length === 0) {
    zones.push(...tzdata.zones);
    links.push(...tzdata.links);
    countries.push(...tzdata.countries);
  }
  for (const zone of tz) {
    for (const z of tzdata.zones) {
      if (z.includes(zone)) {
        zones.push(z);
      }
    }
    for (const z of tzdata.links) {
      if (z.includes(zone)) {
        links.push(z);
      }
    }
    for (const z of tzdata.countries) {
      if (z.includes(zone)) {
        countries.push(z);
      }
    }
  }

  if (startYear === undefined && endYear === undefined) {
    return { version: tzdata.version, zones, links, countries };
  }

  const filteredDateZones: string[] = [];
  for (const zone of zones) {
    const unpacked = utils.tz.unpack(zone);
    const filtered = utils.tz.filterYears(unpacked, startYear, endYear);
    const packed = utils.tz.pack(filtered);
    filteredDateZones.push(packed);
  }
  return { version: tzdata.version, zones: filteredDateZones, links, countries };
}
