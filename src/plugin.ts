import { createRequire } from 'module';
import type { Plugin } from 'vite';
const require = createRequire(import.meta.url);

export function momentTimezonePlugin(
  options: { zones: string[] | undefined } = { zones: undefined },
): Plugin {
  return {
    name: 'vite-plugin-moment-timezone',
    apply: 'build',
    transform(code, id) {
      if (id.includes('moment-timezone/data/packed/latest.json')) {
        const transformedResult = transformMomentTimezone(options.zones);
        return `export default ${JSON.stringify(transformedResult)}`;
      }
    },
  };
}

export function transformMomentTimezone(tz: string[] | undefined) {
  if (!tz) {
    return;
  }

  const tzdata = require('moment-timezone/data/packed/latest.json');

  const zones: string[] = [];
  const links: string[] = [];
  const countries: string[] = [];

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
  const result = { version: tzdata.version, zones, links, countries };
  return result;
}
