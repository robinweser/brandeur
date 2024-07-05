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

#### Arguments

Accepts an object including all of brandeur's [createHooks]() [configuration]().<br />
Additionally, also accepts the following properties:

| Argument     | Type     | Default | Description                  |
| ------------ | -------- | ------- | ---------------------------- |
| baselineGrid | _number_ | 1       | Multiplier for spacing props |

#### Returns

An object containing the [styleSheet]() from [createHooks]() and an generic [El](#el) component.

#### El

##### Props

| Props | Type                  | Default | Description                                                       |
| ----- | --------------------- | ------- | ----------------------------------------------------------------- |
| as    | [React.ElementType]() | `div`   |                                                                   |
| style | [Style]()             |         | Brandeur styles that are automatically converted to inline styles |

> **Note**: All other props are passed down to the rendered component.

##### Example

```tsx
function Button(props) {
  return <button {...props} />
}

const Example = (
  <El style={{ padding: 10 }}>
    <El as="h1" style={{ fontSize: 20 }}>
      Title
    </El>
    <El
      as={Button}
      type="button"
      style={{ backgroundColor: 'blue' }}
      onClick={() => alert('CLICKED')}>
      Click me
    </El>
  </El>
)
```

### createBox

Takes the system object and returns Box component with first-class flexbox layouting props.<br />

> **Important**: It uses different default values for some flexbox properties to align more closely with the React Native defaults.

#### Props

Box renders a [El](#el) component and thus also accepts the `as` and `style` props mentioned above.

| Prop               | Shorthand |  CSS Property    |  Default  |
| ------------------ | --------- | ---------------- | --------- |
| backgroundColor    | bg        |                  |           |
| gap                |           |                  |           |
| display            |           |                  | `flex`    |
| position           |           |                  |           |
| overflow           |           |                  |           |
| overflowX          |           |                  |           |
| overflowY          |           |                  |           |
| padding            |           |                  |           |
| paddingLeft        |           |                  |           |
| paddingRight       |           |                  |           |
| paddingBottom      |           |                  |           |
| paddingTop         |           |                  |           |
| paddingX           |           |                  |           |
| paddingInline      |           |                  |           |
| paddingInlineStart |           |                  |           |
| paddingInlineEnd   |           |                  |           |
| paddingY           |           |                  |           |
| paddingBlock       |           |                  |           |
| paddingBlockStart  |           |                  |           |
| paddingBlockEnd    |           |                  |           |
| margin             |           |                  |           |
| marginLeft         |           |                  |           |
| marginRight        |           |                  |           |
| marginBottom       |           |                  |           |
| marginTop          |           |                  |           |
| marginX            |           |                  |           |
| marginInline       | marginX   |                  |           |
| marginInlineStart  |           |                  |           |
| marginInlineEnd    |           |                  |           |
| marginY            |           |                  |           |
| marginBlock        | marginY   |                  |           |
| marginBlockStart   |           |                  |           |
| marginBlockEnd     |           |                  |           |
| height             |           |                  |           |
| width              |           |                  |           |
| minWidth           |           |                  |           |
| maxWidth           |           |                  |           |
| minHeight          |           |                  |           |
| maxHeight          |           |                  |           |
| order              |           |                  |           |
| alignContent       |           |                  |           |
| justifyContent     |           |                  |           |
| alignItems         |           |                  | `stretch` |
| alignSelf          |           |                  |           |
| flex               |           |                  |           |
| grow               |           | `flex-grow`      |           |
| shrink             |           | `flex-shrink`    |           |
| basis              |           | `flex-basis`     |           |
| direction          |           | `flex-direction` | `column`  |
| wrap               |           | `flex-wrap`      |           |

#### Example

```tsx
import { createBox } from 'brandeur-primitives'

const Box = createBox(system)

const App = (
  <Box padding={10} gap={4}>
    <Box direction="row" gap={2}>
      <Box bg="red" width={50} height={50} />
      <Box bg="blue" width={50} height={50} />
    </Box>
    <Box direction="row" gap={2}>
      <Box bg="green" width={50} height={50} />
      <Box bg="yellow" width={50} height={50} />
    </Box>
  </Box>
)
```

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
