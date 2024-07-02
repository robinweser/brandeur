# brandeur-plugin-enforce-longhand

Sorts styles in a way that always enforces longhand over shorthand properties.

> Read [The Shorthand-Longhand Problem in Atomic CSS](https://weser.io/blog/the-shorthand-longhand-problem-in-atomic-css) for an in-depth explanation of why this is neccessary.

<img alt="npm version" src="https://badge.fury.io/js/brandeur-plugin-enforce-longhand.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/brandeur-plugin-enforce-longhand.svg"> <a href="https://bundlephobia.com/result?p=brandeur-plugin-enforce-longhand@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/brandeur-plugin-enforce-longhand.svg"></a>

## Installation

```sh
# npm
npm i --save brandeur-plugin-enforce-longhand
# yarn
yarn add brandeur-plugin-enforce-longhand
# pnpm
pnpm add brandeur-plugin-enforce-longhand
```

## Usage

```ts
import enforceLonghand from 'brandeur-plugin-enforce-longhand'

const plugin = enforceLonghand()
```

## Configuration

| Parameter  |  Type                                   | Default  |  Description |
| ---------- | --------------------------------------- | -------- | ------------ |
| borderMode | `none` \|  `directional` \|  `longhand` |  `none`  |              |

```ts
import enforceLonghand from 'brandeur-plugin-enforce-longhand'

const plugin = enforceLonghand('directional')
```

## License

Brandeur is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Commons License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](https://weser.io).
