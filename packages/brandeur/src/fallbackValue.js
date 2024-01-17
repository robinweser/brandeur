export default function fallbackValue(property, values, match) {
  const actualMatch = match || values[values.length - 1]

  return {
    property,
    values,
    match: actualMatch,
  }
}
