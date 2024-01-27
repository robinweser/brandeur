import isPlainObject from 'isobject'
import { assignStyle } from 'css-in-js-utils'

function resolveResponsiveValues(style, getMediaQueries) {
  for (const property in style) {
    const value = style[property]

    // resolve nested styles
    if (isPlainObject(value)) {
      style[property] = resolveResponsiveValues(value, getMediaQueries)
    }

    if (Array.isArray(value)) {
      const mediaQueries = getMediaQueries(value)

      const [defaultValue, ...mediaValues] = value
      style[property] = defaultValue

      mediaQueries.slice(0, mediaValues.length).forEach((query, index) => {
        assignStyle(style, {
          [query]: {
            [property]: mediaValues[index],
          },
        })
      })
    }
  }

  return style
}

export default function responsiveValuePlugin(getMediaQueries) {
  return function responsiveValue(style) {
    return resolveResponsiveValues(style, getMediaQueries)
  }
}
