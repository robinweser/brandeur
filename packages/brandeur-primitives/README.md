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

- [createSystem](#createsystem)
- [createBox](#createbox)
- [createText](#createtext)
- [createClick](#createclick)
- [createGrid](#creategrid)
- [createOverlay](#createoverlay)
- [createSpacer](#createspacer)
- [createVisuallyHidden](#createvisuallyhidden)

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

Takes the system object and returns Box component with first-class flexbox layout props.

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
| paddingInline      | paddingX  |                  |           |
| paddingInlineStart |           |                  |           |
| paddingInlineEnd   |           |                  |           |
| paddingBlock       | paddingY  |                  |           |
| paddingBlockStart  |           |                  |           |
| paddingBlockEnd    |           |                  |           |
| margin             |           |                  |           |
| marginLeft         |           |                  |           |
| marginRight        |           |                  |           |
| marginBottom       |           |                  |           |
| marginTop          |           |                  |           |
| marginInline       | marginX   |                  |           |
| marginInlineStart  |           |                  |           |
| marginInlineEnd    |           |                  |           |
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

const Example = (
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

Takes the system object and a typography map and returns Text component with first-class text props and typography variants.<br />
The typography map takes pairs of string variants and style objects.

The first instance of Text renders `display: block` while all child instances render `display: inline-block`.

#### Props

Box renders a [El](#el) component and thus also accepts the `as` and `style` props mentioned above.

| Prop       | Type               |  CSS Property     |  Default |
| ---------- | ------------------ | ----------------- | -------- |
| variant    | `keyof typography` |                   |          |
| size       |                    |                   |          |
| color      |                    |                   |          |
| height     |                    | `line-height`     |          |
| weight     |                    | `font-weight`     |          |
| decoration |                    | `text-decoration` |          |

#### Example

```tsx
import { createText } from 'brandeur-primitives'

const Text = createBox(system, {
  title: {
    fontSize: 32,
    fontWeight: 700,
    fontFamily: 'Inter',
  },
  body: {
    fontSize: 16,
  },
})

const Example = (
  <>
    <Text variant="title">Hello</Text>
    <Text variant="body">
      Hello{' '}
      <Text color="red" weight={700}>
        World
      </Text>
    </Text>
  </>
)
```

### createClick

tbd.

### createGrid

Takes the system object and returns Box component with first-class grid layout props.

#### Props

Grid renders a [El](#el) component and thus also accepts the `as` and `style` props mentioned above.

| Prop    |  CSS Property           |
| ------- | ----------------------- |
| gap     | `grid-gap`              |
| columns | `grid-template-columns` |
| rows    | `grid-template-rows`    |
| areas   | `grid-template-areas`   |

#### Example

```tsx
import { createGrid } from 'brandeur-primitives'

const Grid = createGrid(system)

const Example = (
  <Grid columns="1fr 1fr 1fr" gap={4}>
    <div>Hello</div>
    <div>World</div>
    <div>!</div>
  </Grid>
)
```

### createOverlay

Takes the system object and returns an Overlay component with `position: fixed` and `padding-*: safe-area-inset-*`.

#### Props

Grid renders a [El](#el) component and thus also accepts the `as` and `style` props mentioned above.

| Prop    | Type      |   Default |
| ------- | --------- | --------- |
| visible | `boolean` | `false`   |
| zIndex  |           |           |
| inset   |           |           |
| top     |           |           |
| left    |           |           |
| bottom  |           |           |
| right   |           |           |

#### Example

```tsx
import { createOverlay } from 'brandeur-primitives'

const Grid = createOverlay(system)

const Example = <Overlay>Fixed overlay</Overlay>
```

### createSpacer

Takes the system object and returns a Spacer component.

#### Props

Spacer takes a single `size` prop that accepts a length value.<br />
If a `number` is passed and respects the [baselineGrid](Arguments).

#### Example

```tsx
import { createSpacer } from 'brandeur-primitives'

const Spacer = createSpacer(system)

const Example = (
  <>
    <div>Hello</div>
    <Spacer size={10} />
    <div>World</div>
  </>
)
```

### createVisuallyHidden

Takes the system object and returns a component that visually hides its children while keeping them visible to screen readers.

#### Example

```tsx
import { createVisuallyHidden } from 'brandeur-primitives'

const VisuallyHidden = createVisuallyHidden(system)

const Example = <VisuallyHidden>I am visually hidden</VisuallyHidden>
```

## License

Brandeur is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Commons License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](https://weser.io).
