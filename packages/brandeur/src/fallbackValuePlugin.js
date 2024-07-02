import isPlainObject from 'isobject'

import getFallbackVariable from './getFallbackVariable.js'

export default function fallbackValuePlugin(fallbacks = []) {
  const fallbackMap = fallbacks.reduce((map, { property, values, match }) => {
    // use the last value as a default matcher if no match is provided
    const actualMatch = match || values[values.length - 1]

    ;[].concat(property).forEach((prop) => {
      map[prop] = actualMatch
    })

    return map
  }, {})

  return function resolveFallbackValue(style) {
    for (let property in style) {
      const value = style[property]

      if (isPlainObject(value)) {
        style[property] = resolveFallbackValue(value)
      } else {
        const fallback = fallbackMap[property]

        if (fallback && fallback === value) {
          style[property] =
            'var(' + getFallbackVariable(property, fallback) + ')'
        }
      }
    }

    return style
  }
}
