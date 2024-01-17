export default function sortPropertiesPlugin(propertyPriority = {}) {
  function getPriority(property) {
    return propertyPriority[property] || 0
  }

  return function sort(style) {
    return Object.keys(style)
      .sort((a, b) => getPriority(a) - getPriority(b))
      .reduce((out, property) => ({ ...out, [property]: style[property] }), {})
  }
}
