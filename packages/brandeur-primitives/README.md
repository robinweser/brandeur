# brandeur-primitives

<img alt="npm version" src="https://badge.fury.io/js/brandeur-primitives.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/brandeur-primitives.svg"> <a href="https://bundlephobia.com/result?p=brandeur-primitives@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/brandeur-primitives.svg"></a>

## Installation

```sh
# npm
npm i --save brandeur-primitives
# yarn
yarn add brandeur-primitives
# pnpm
pnpm add brandeur-primitives
```

## Usage

```tsx
import { createSystem, createBox, createText } from 'brandeur-primitives'

const system = createSystem({
  // brandeur config here
  baselineGrid: 1,
})

const Box = createBox(system)
const Text = createText(system, {
  heading: {
    fontSize: 28,
    fontWeight: 700,
  },
  body: {
    fontSize: 16,
  },
})

const App = (
  <>
    <style dangerouslySetInnerHTML={{ __html: system.styleSheet }} />
    <Box padding={5} gap={2}>
      <Text as="h1" variant="heading" color="red">
        Headline
      </Text>
      <Text variant="body">Some body text</Text>
    </Box>
  </>
)
```

## API Reference

### createSystem

#### El

#### styleSheet

### createBox

### createText

### createClick

### createGrid

### createOverlay

### createSpacer

### createVisuallyHidden

## License

Brandeur is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Commons License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](https://weser.io).
