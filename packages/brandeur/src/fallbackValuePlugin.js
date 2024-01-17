import generateFallbackVariable from './generateFallbackVariable'

export default function fallbackValuePlugin(fallbacks = []) {
  return function resolveFallbackValue(style) {
    for (let prop in style) {
      if (typeof style[prop] === 'object') {
        style[prop] = resolveFallbackValue(style[prop])
      } else {
        // TODO: turn into map for perf
        const fallback = fallbacks.find(
          ({ property, match }) => property === prop && match === style[prop]
        )

        if (fallback) {
          style[prop] =
            'var(' + generateFallbackVariable(prop, fallback.match) + ')'
        }
      }
    }

    return style
  }
}
