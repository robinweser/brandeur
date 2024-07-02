# brandeur-plugin-responsive-value

Adds vendor prefixes to style properties and values when required.

<img alt="npm version" src="https://badge.fury.io/js/brandeur-plugin-responsive-value.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/brandeur-plugin-responsive-value.svg"> <a href="https://bundlephobia.com/result?p=brandeur-plugin-responsive-value@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/brandeur-plugin-responsive-value.svg"></a>

## Installation

```sh
# npm
npm i --save brandeur-plugin-responsive-value
# yarn
yarn add brandeur-plugin-responsive-value
# pnpm
pnpm add brandeur-plugin-responsive-value
```

## Usage

```ts
import responsiveValue from 'brandeur-plugin-responsive-value'

const plugin = responsiveValue([
  '@media (min-width: 320px)',
  '@media (min-width: 1024px)',
])
```

## Configuration

| Parameter    |  Type             |  Description                                                         |
| ------------ | ----------------- | -------------------------------------------------------------------- |
| mediaQueries | `Array<string>`   | Ordered list of media queries that reference the values in the array |

### Input

> Using the example configuration from above.

```ts
{
  paddingLeft: [10, 15, 20]
}
```

### Output

```ts
{
  paddingLeft: 10,
  "@media (min-width: 320px)": {
    paddingLeft: 15
  },
  "@media (min-width: 1024px)": {
    paddingLeft: 20
  }
}
```

## License

Brandeur is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Commons License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](https://weser.io).
