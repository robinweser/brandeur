# API Reference

Currently Brandeur only exposes two functions:

- [createHooks](#createhooks)
- [fallbackValue](#fallbackValue)

## createHooks

The main API that wraps [createHooks](https://css-hooks.com/docs/react/api) from [css-hooks](https://css-hooks.com).<br />
It returns the same structural array including both the static CSS and the `css` function. The difference is that the static CSS includes more than just the hooks and the `css` function also accepts functions.

### Arguments

It accepts the following arguments as an object.

| Argument  | Type               | Description                                                                                                                                                   |
| --------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| plugins   | _Array\<Plugin>_   | List of plugins that are used to process each style before transforming into a flat hooks style. See [Plugins](#plugins) for a list of all available plugins. |
| fallbacks | _Array\<Fallback>_ | List of fallbacks that are added and automatically replace within style objects.                                                                              |
| keyframes | _Object_           | A map of animationName-keyframe pairs.                                                                                                                        |
| theme     | _Object_           | A theme object that can be accessed from within style functions.                                                                                              |

#### Plugin

```ts
type Plugin = style => style
```

Plugins are simple functions that take a style object and return a new one, similar to Fela plugins.

> **Note**: See [Plugins](#plugins) for a list of all available plugins.

#### Fallback

```ts
type Fallback = {
  property: string | Array<string>
  values: Array<string>
  match?: string
}
```

> **Tip**: The [fallbackValue](#fallbackvalue) API provides a convenient way to create those fallback objects.

### Returns

It returns an array where the first item is a static CSS string and the second item is the `css` function to create styles. The `css` function accepts both style object as well as functions where the first argument is an object that only has a theme property.

### Example

See [The Gist](#the-gist).

## fallbackValue

A tiny helper function to create fallbacks in a more convenient way.

### Arguments

It accepts the following arguments as an object.

| Argument | Type                       | Description                                                                                                     |
| -------- | -------------------------- | --------------------------------------------------------------------------------------------------------------- |
| property | _Array\<string> \| string_ | A property or list of properties for which the fallback value applies.                                          |
| values   | _Array\<string>_           | A list of fallback values where the last one is the default.                                                    |
| match    | _string?_                  | An optional matcher string that's used to replace values in style objects. Defaults to the last `values` value. |

### Returns

(_[Fallback](#fallback)_) An object with respective fallback properties.

### Example

```js
import { fallbackValue } from 'brandeur'

const positionSticky = fallbackValue('position', ['-webkit-sticky', 'sticky'])
```
