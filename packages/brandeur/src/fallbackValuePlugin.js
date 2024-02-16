import getFallbackVariable from './getFallbackVariable'

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
    for (let prop in style) {
      if (typeof style[prop] === 'object') {
        style[prop] = resolveFallbackValue(style[prop])
      } else {
        const fallback = fallbackMap[prop]

        if (fallback && fallback === style[prop]) {
          style[prop] = 'var(' + getFallbackVariable(prop, fallback) + ')'
        }
      }
    }

    return style
  }
}
