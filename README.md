# remarkable-header-ids [![NPM version](https://img.shields.io/npm/v/remarkable-header-ids.svg?style=flat)](https://www.npmjs.com/package/remarkable-header-ids) [![NPM downloads](https://img.shields.io/npm/dm/remarkable-header-ids.svg?style=flat)](https://npmjs.org/package/remarkable-header-ids) [![Build Status](https://img.shields.io/travis/doowb/remarkable-header-ids.svg?style=flat)](https://travis-ci.org/doowb/remarkable-header-ids)

Autogenerate unique ids for text headers (h1,...h6)

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save remarkable-header-ids
```

## Usage

```js
const HeaderIdsPlugin = require("remarkable-header-ids");
const Remarkable = require("remarkable");

const markdownParser = new Remarkable().use(
  HeaderIdsPlugin()
);
```

## Options

**Params**

| Option name     | Type                       | defaultValue               | Note                                                               |
| --------------- | -------------------------- | -------------------------- | ------------------------------------------------------------------ |
| levels          | `number[]`                 | [1, 2, 3, 4, 5, 6]         |                                                                    |
| anchorClassName | `string`                   | "header-anchor"            |                                                                    |
| anchorText      | `string`                   | "#"                        | When `anchorText` is empty, the anchor will not be rendered at all |
| headerId        | `(slug: string) => string` | slug => "heading-#" + slug |                                                                    |

**Example**

```js
const Remarkable = require("remarkable");
const HeaderIdsPlugin = require("remarkable-header-ids");

const parser = new Remarkable().use(
  HeaderIdsPlugin({
    levels: [2], // only transform h2
    anchorClassName: "this-is-anchor-in-header",
    anchorText: "AnchorText",
    headerId: (slug) =>
      `header-that-has-this-anchor-${slug}`,
  })
);
```

## About

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

Please read the [contributing guide](contributing.md) for avice on opening issues, pull requests, and coding standards.

### Tests

Test content is located inside the test directory. For more info regarding the internals of test suite, check out `test/parse.js`.

to run the test, execute `npm test` from the root directory. This script will render into `test/parsed.html`.

### Author

**Farzad Yousefzadeh**

- [github/farskid](https://github.com/farskid)
- [twitter/farzad_yz](http://twitter.com/farzad_yz)

### License

Copyright © 2020, [github/farskid](https://github.com/farskid).
Released under the [MIT license](https://github.com/doowb/remarkable-mentions/blob/master/LICENSE).
