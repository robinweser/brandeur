# brandeur-plugin-sort-property

Sorts properties according to a property priority map.

<img alt="npm version" src="https://badge.fury.io/js/brandeur-plugin-sort-property.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/brandeur-plugin-sort-property.svg"> <a href="https://bundlephobia.com/result?p=brandeur-plugin-sort-property@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/brandeur-plugin-sort-property.svg"></a>

## Installation

```sh
# npm
npm i --save brandeur-plugin-sort-property
# yarn
yarn add brandeur-plugin-sort-property
# pnpm
pnpm add brandeur-plugin-sort-property
```

## Usage

```ts
import sortProperty from 'brandeur-plugin-sort-property'

const plugin = sortProperty({
  paddingTop: 2,
  paddingRight: 2,
  paddingBottom: 2,
  paddingLeft: 2,
})
```

## Configuration

| Parameter   |  Type                         |  Description                                                                |
| ----------- | ----------------------------- | --------------------------------------------------------------------------- |
| priorityMap | [PriorityMap](#prioritymap)   | A map of CSS properties and their sorting priority. Default priority is `1` |

### PriorityMap

```ts
Record<keyof CSSProperties, number>
```

### Input

> Using the example configuration from above.

```ts
{
  paddingLeft: 5,
  padding: 10,
}
```

### Output

```ts
{
  padding: 10,
  paddingLeft: 5,
}
```

## License

Brandeur is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Commons License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](https://weser.io).
