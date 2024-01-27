# Brandeur

Brandeur is a convenience layer and tool belt on top of [css-hooks](https://css-hooks.com) for React. It works as a drop-in replacement using the exact same API interface. It supports many community favorite Fela plugins for optimal DX.

<a href="https://bundlephobia.com/result?p=brandeur@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/brandeur.svg"></a> <img alt="npm downloads" src="https://img.shields.io/npm/dm/brandeur.svg">

## Support Us

Support Robin Weser's work on Brandeur and its ecosystem directly via [**GitHub Sponsors**](https://github.com/sponsors/robinweser).

## Benefits

- Identical API
- Vendor Prefixing
- Fallback Value Support
- Keyframes Support
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
  keyframes: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
  },
  theme,
})

// fades in, red color, vendor prefixed and browser-compatible position: sticky
const style = css(({ theme, keyframes }) => ({
  animationName: keyframes.fadeIn,
  color: theme.colors.primary,
  position: 'sticky',
  appearance: 'none',
}))
```

## Why

tbd.

## Documentation

Before using Brandeur, we recommend you get familiar with [css-hooks](https://css-hooks.com) first.

- [Motivation]()
- [Getting Started]()
- [Plugins]()
- [Keyframes]()
- [Fallback Values]()
- [Performance]()
- [API Reference]()

## Roadmap

- TypeScript Support
- RTL Conversion
- Theming Primitives
- Configuration
- Framework-Agnostic API

## License

Brandeur is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Commons License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](https://weser.io).
