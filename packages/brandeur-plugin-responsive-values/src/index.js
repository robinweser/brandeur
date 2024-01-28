import isPlainObject from 'isobject'
import { assignStyle } from 'css-in-js-utils'

function resolveResponsiveValues(style, mediaQueries) {
  for (const property in style) {
    const value = style[property]

    // resolve nested styles
    if (isPlainObject(value)) {
      style[property] = resolveResponsiveValues(value, mediaQueries)
    }

    if (Array.isArray(value)) {
      const [defaultValue, ...mediaValues] = value
      style[property] = defaultValue

      mediaQueries.slice(0, mediaValues.length).forEach((query, index) => {
        if (mediaValues[index] !== null && mediaValues[index] !== undefined) {
          assignStyle(style, {
            [query]: {
              [property]: mediaValues[index],
            },
          })
        }
      })
    }
  }

  return style
}

export default function responsiveValuePlugin(mediaQueries) {
  return function responsiveValue(style) {
    return resolveResponsiveValues(style, mediaQueries)
  }
}
