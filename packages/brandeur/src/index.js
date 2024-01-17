import { createHooks } from '@css-hooks/react'

import fallbackValuePlugin from './fallbackValuePlugin'
import generateFallbackVariable from './generateFallbackVariable'

function processStyle(style, plugins) {
  return plugins.reduce((processed, plugin) => plugin(processed), style)
}

function resolveStyle(style, theme) {
  if (typeof style === 'function') {
    return style({ theme })
  }

  return style
}

export default function brandeur({
  hooks,
  plugins = [],
  fallbacks = [],
  theme = {},
  config = {},
}) {
  if (fallbacks.length > 0) {
    plugins.push(fallbackValuePlugin(fallbacks))
  }

  const [baseCSS, fn] = createHooks(hooks)

  const fallbackCSS = fallbacks.map(({ property, values = [], match }) => {
    // use the last value as a default matcher if no match is provided
    const actualMatch = match || values[values.length - 1]

    const variable = generateFallbackVariable(property, actualMatch)

    return (
      `:root {${variable}: ;}` +
      values
        .map(
          (value) =>
            `@supports (${property}:${value}) { :root {${variable}: ${value}}}`
        )
        .join('')
    )
  })

  const staticCSS = [fallbackCSS.join(''), baseCSS].join('')

  function css(style) {
    return fn(processStyle(resolveStyle(style, theme), plugins, theme))
  }

  return [staticCSS, css]
}
