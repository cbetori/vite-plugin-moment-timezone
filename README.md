# vite-plugin-moment-timezone

This is a **plugin** for **vite** which reduces **data** for **moment-timezone**.

This plugin allows you to configure which time zone data you want. Any unwanted data is then automatically stripped from the compiled JS bundle at build time.

### Limitations

This plugin only runs during the build phase. Make sure to test your build before deploying.

## Usage

### Installation

Using [npm][npm]:

```sh
npm install --save-dev vite-plugin-moment-timezone
```

### Configuration

Add the plugin to your vite config file:

```js
import { defineConfig } from 'vite';
import momentTimezonePlugin from 'vite-plugin-moment-timezone';

export default defineConfig({
  plugins: [
    momentTimezonePlugin({ zones: ['America/Los_Angeles'], startYear: 2000, endYear: 2020 }),
  ],
});
```

#### Plugin options

- `zones` _(string[])_ — Only include data for time zones with names matching this value. THis can be left undefined if you want to include all time zones.
- `startYear` _(integer)_ — Only include data starting from this year. This can be left undefined if you want to include all times.
- `endYear` _(integer)_ — Only include data ending at this year. This can be left undefined if you want to include all times.

### Version support

This plugin is new and has an extremely limited testing. The plugin has only been tested with the following dependencies:

- Node.js 20
- vite 5
- moment-timezone v0.5.0 or higher

## License

[MIT License © Gilmore Davidson](LICENSE)
