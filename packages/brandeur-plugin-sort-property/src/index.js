import isPlainObject from 'isobject'

export default function sortPropertyPlugin(propertyPriority = {}) {
  function getPriority(property) {
    return propertyPriority[property] || 0
  }

  return function sortProperty(style) {
    return Object.keys(style)
      .sort((a, b) => getPriority(a) - getPriority(b))
      .reduce((out, property) => {
        const value = style[property]

        if (isPlainObject(value)) {
          return {
            ...out,
            [property]: sortProperty(value),
          }
        }

        return {
          ...out,
          [property]: value,
        }
      }, {})
  }
}
