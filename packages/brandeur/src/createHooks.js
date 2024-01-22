import { createHooks as baseCreateHooks } from '@css-hooks/react'

import fallbackValuePlugin from './fallbackValuePlugin'
import getFallbackVariable from './getFallbackVariable'

function processStyle(style, plugins) {
  return plugins.reduce((processed, plugin) => plugin(processed), style)
}

function resolveStyle(style, theme) {
  if (typeof style === 'function') {
    return style({ theme })
  }

  return style
}

function getFallbackCSS(fallbacks) {
  const rootCSS = fallbacks.reduce((css, { property, match }) => {
    // use the last value as a default matcher if no match is provided
    const actualMatch = match || values[values.length - 1]

    return (
      css +
      []
        .concat(property)
        .map((prop) => `${getFallbackVariable(prop, actualMatch)}:;`)
        .join('')
    )
  }, '')

  const supportsCSS = fallbacks.map(({ property, values = [], match }) => {
    // use the last value as a default matcher if no match is provided
    const actualMatch = match || values[values.length - 1]

    return values
      .map((value) =>
        []
          .concat(property)
          .map(
            (prop) =>
              `@supports (${prop}:${value}){:root{${getFallbackVariable(prop, actualMatch)}:${value}}}`
          )
          .join('')
      )
      .join('')
  })

  return `:root {${rootCSS}}` + supportsCSS.join('')
}

export default function createHooks({
  hooks,
  plugins = [],
  fallbacks = [],
  theme = {},
}) {
  if (fallbacks.length > 0) {
    plugins.push(fallbackValuePlugin(fallbacks))
  }

  const [baseCSS, fn] = baseCreateHooks(hooks)
  const fallbackCSS = getFallbackCSS(fallbacks)
  const staticCSS = fallbackCSS + baseCSS

  function css(style) {
    return fn(processStyle(resolveStyle(style, theme), plugins, theme))
  }

  return [staticCSS, css]
}
