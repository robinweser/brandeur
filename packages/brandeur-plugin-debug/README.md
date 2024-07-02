# brandeur-plugin-debug

Adds deubg styles to elements for simple layout debugging.<br />
Uses [styles-debugger](https://github.com/kitze/styles-debugger) under the hood.

<img alt="npm version" src="https://badge.fury.io/js/brandeur-plugin-debug.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/brandeur-plugin-debug.svg"> <a href="https://bundlephobia.com/result?p=brandeur-plugin-debug@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/brandeur-plugin-debug.svg"></a>

## Installation

```sh
# npm
npm i --save brandeur-plugin-debug
# yarn
yarn add brandeur-plugin-debug
# pnpm
pnpm add brandeur-plugin-debug
```

## Usage

```ts
import debug from 'brandeur-plugin-debug'

const plugin = debug()
```

## Configuration

| Parameter   |  Type                                                                     | Default  |  Description                                                                     |
| ----------- | ------------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------- |
| autoActive  | `boolean`                                                                 |  `true`  | Whether debug styles are active globally                                         |
| config      |  [Config](https://github.com/kitze/styles-debugger#configuration-options) |          | Custom [styles-debugger](https://github.com/kitze/styles-debugger) configuration |

When `autoActive` is disabled, one can opt-in by passing `debug: true` in a style object.

```ts
import debug from 'brandeur-plugin-debug'

const plugin = debug(false, {
  debugWith: 'background',
})
```

## License

Brandeur is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Commons License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](https://weser.io).
