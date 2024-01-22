# Brandeur

Brandeur is a convenience layer and tool belt on top of [css-hooks](https://css-hooks.com) for React.

<a href="https://bundlephobia.com/result?p=brandeur@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/brandeur.svg"></a> <img alt="npm downloads" src="https://img.shields.io/npm/dm/brandeur.svg">

## Support Us

Support Robin Weser's work on Brandeur and its ecosystem directly via [**GitHub Sponsors**](https://github.com/sponsors/robinweser).

## Benefits

- Same API
- Vendor Prefixing
- Fallback Value Support
- Fela Plugin Compatibility

## The Gist

```javascript
import { createHooks } from 'brandeur'
import prefixer, { fallbacks } from 'brandeur-plugin-prefixer'

const theme = {
  colors: { primary: 'red' },
}

const [staticCSS, css] = createHooks({
  hooks: {
    // either custom hooks or @css-hooks/recommended
  },
  plugins: [prefixer()],
  fallbacks: [
    ...fallbacks,
    { property: 'position', values: ['-webkit-sticky', 'sticky'] },
  ],
  theme,
})

// red color, vendor prefixed and browser-compatible position: sticky
const style = css(({ theme }) => ({
  color: theme.colors.primary,
  position: 'sticky',
  appearance: 'none',
}))
```

## Why

tbd.

## API

Currently Brandeur only exposes two functions:

- [createHooks](#createhooks)
- [fallbackValue](#fallbackValue)

### createHooks

The main API that wraps [createHooks](https://css-hooks.com/docs/react/api) from [css-hooks](https://css-hooks.com).<br />
It returns the same structural array including both the static CSS and the `css` function. The difference is that the static CSS includes more than just the hooks and the `css` function also accepts functions.

#### Arguments

It accepts the following arguments as an object.

| Argument  | Type               | Description                                                                                                                                                   |
| --------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| plugins   | _Array\<Plugin>_   | List of plugins that are used to process each style before transforming into a flat hooks style. See [Plugins](#plugins) for a list of all available plugins. |
| fallbacks | _Array\<Fallback>_ | List of fallbacks that are added and automatically replace within style objects.                                                                              |
| theme     | _Object_           | A theme object that can be accessed from within style functions.                                                                                              |

##### Plugin

```ts
type Plugin = style => style
```

Plugins are simple functions that take a style object and return a new one, similar to Fela plugins.

> **Note**: See [Plugins](#plugins) for a list of all available plugins.

##### Fallback

```ts
type Fallback = {
  property: string | Array<string>
  values: Array<string>
  match?: string
}
```

> **Tip**: The [fallbackValue](#fallbackvalue) API provides a convenient way to create those fallback objects.

#### Returns

It returns an array where the first item is a static CSS string and the second item is the `css` function to create styles. The `css` function accepts both style object as well as functions where the first argument is an object that only has a theme property.

#### Example

See [The Gist](#the-gist).

### fallbackValue

A tiny helper function to create fallbacks in a more convenient way.

#### Arguments

It accepts the following arguments as an object.

| Argument | Type                       | Description                                                                                                     |
| -------- | -------------------------- | --------------------------------------------------------------------------------------------------------------- |
| property | _Array\<string> \| string_ | A property or list of properties for which the fallback value applies.                                          |
| values   | _Array\<string>_           | A list of fallback values where the last one is the default.                                                    |
| match    | _string?_                  | An optional matcher string that's used to replace values in style objects. Defaults to the last `values` value. |

#### Returns

(_[Fallback](#fallback)_) An object with respective fallback properties.

#### Example

```js
import { fallbackValue } from 'brandeur'

const positionSticky = fallbackValue('position', ['-webkit-sticky', 'sticky'])
```

## Plugins

The following table shows all plugins available for Brandeur. It supports quite a bunch of Fela plugins, but might not always be fully compatible. Therefore we're highlighting the differences as well.

| Name                                                                                                                       | Description                                                                                                             | Compatibility                                                                               |
| -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [bredon-plugin-prefixer](https://github.com/robinweser/bredon/tree/main/packages/bredon-plugin-prefixer)                   | Adds vendor prefixes to style objects.                                                                                  | -                                                                                           |
| [bredon-plugin-sort-properties](https://github.com/robinweser/bredon/tree/main/packages/bredon-plugin-sort-properties)     | Sorts properties according to a priorty map. Helpful when trying to enforce certain properties over others.             | -                                                                                           |
| [bredon-plugin-enforce-longhands](https://github.com/robinweser/bredon/tree/main/packages/bredon-plugin-enforce-longhands) | Specific implementation of sort-properties. Enforces longhand over shorthand properties for more deterministic results. | -                                                                                           |
| [fela-plugin-bidi](https://github.com/robinweser/fela/tree/master/packages/fela-plugin-bidi)                               | Enables direction-independent styles by converting them to either `rtl` or `ltr` on the fly.                            | Does not support context-specific `direction` via `theme`.                                  |
| [fela-plugin-custom-property](https://github.com/robinweser/fela/tree/master/packages/fela-plugin-custom-property)         | Resolves custom properties.                                                                                             | Full                                                                                        |
| [fela-plugin-expand-shorthand](https://github.com/robinweser/fela/tree/master/packages/fela-plugin-expand-shorthand)       | Expands shorthand properties into their longhand forms.                                                                 | Full                                                                                        |
| [fela-plugin-extend](https://github.com/robinweser/fela/tree/master/packages/fela-plugin-extend)                           | Adds a convenient syntax for (conditionally) extending styles.                                                          | Full                                                                                        |
| [fela-plugin-hover-media](https://github.com/robinweser/fela/tree/master/packages/fela-plugin-hover-media)                 | Wraps `:hover` styles in `@media (hover: hover)` queries.                                                               | Full                                                                                        |
| [fela-plugin-kebab-case](https://github.com/robinweser/fela/tree/master/packages/fela-plugin-kebab-case)                   | Converts properties written in kebab-case to camelCase.                                                                 | Full                                                                                        |
| [fela-plugin-logger](https://github.com/robinweser/fela/tree/master/packages/fela-plugin-logger)                           | Logs processed style objects.                                                                                           | Full                                                                                        |
| [fela-plugin-multiple-selectors](https://github.com/robinweser/fela/tree/master/packages/fela-plugin-multiple-selectors)   | Resolves multiple comma-separated selectors to individual object keys.                                                  | Full                                                                                        |
| [fela-plugin-responsive-value](https://github.com/robinweser/fela/tree/master/packages/fela-plugin-responsive-value)       | Resolves array values to pre-defined media queries. Useful for component APIs.                                          | Does not support the `props` argument to receive the `theme`. Use a static `theme` instead. |
| [fela-plugin-rtl](https://github.com/robinweser/fela/tree/master/packages/fela-plugin-rtl)                                 | Converts styles to their right-to-left counterpart                                                                      | Does not support context-specific `direction` via `theme`.                                  |
| [fela-plugin-unit](https://github.com/robinweser/fela/tree/master/packages/fela-plugin-unit)                               | Automatically adds units to values if needed.                                                                           | Full                                                                                        |
| [fela-plugin-validator](https://github.com/robinweser/fela/tree/master/packages/fela-plugin-validator)                     | Validates, logs & optionally deletes invalid properties for keyframes and rules.                                        | Full                                                                                        |

### Incompatible Fela Plugins

| Plugin                                                                                                                                                                     | Alternative                                                                                                           |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| fela-plugin-prefixer                                                                                                                                                       | Use [bredon-plugin-prefixer](https://github.com/robinweser/bredon/tree/main/packages/bredon-plugin-prefixer) instead. |
| fela-plugin-named-keys<br/>fela-plugin-friendly-pseudo-class<br/>fela-plugin-pseudo-prefixer<br/>fela-plugin-fullscreen-prefixer<br/>fela-plugin-placeholder-prefixer<br/> | Use `hooks` directly to set those.                                                                                    |
| fela-plugin-embedded                                                                                                                                                       | No replacement yet due to missing font and keyframe primitives.                                                       |
| fela-plugin-theme-value                                                                                                                                                    | No replacement yet due to incompatible plugin APIs.                                                                   |

## Roadmap

- TypeScript Support
- RTL Conversion
- Font & Keyframes Primitives
- Theming Primitives
- Configuration
- Framework-Agnostic API

## License

Brandeur is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Commons License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](https://weser.io).
