function makeResponsiveTransform(transform) {
  return (value) => {
    if (Array.isArray(value)) {
      return value.map(transform)
    }
    if (value && typeof value === 'object') {
      return Object.keys(value).reduce((out, key) => {
        out[key] = transform(value[key])
        return out
      }, {})
    }

    return transform(value)
  }
}

export default function applyMultiplier(factor = 1) {
  return makeResponsiveTransform((value) => {
    if (value === undefined || value === null) {
      return undefined
    }

    if (typeof value !== 'number') {
      return value
    }

    return value * factor
  })
}
