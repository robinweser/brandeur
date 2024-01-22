import getFallbackVariable from './getFallbackVariable'

export default function fallbackValuePlugin(fallbacks = []) {
  const fallbackMap = fallbacks.reduce((map, { property, match }) => {
    ;[].concat(property).forEach((prop) => {
      map[prop] = match
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
