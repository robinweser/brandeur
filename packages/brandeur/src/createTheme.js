import isObject from 'isobject'

function extractVariables(theme, parent = '', variables = {}) {
  for (const property in theme) {
    const value = theme[property]

    const name = parent + (parent ? '-' : '') + property

    if (isObject(value)) {
      extractVariables(value, name, variables)
    } else {
      variables['--' + name] = value
      theme[property] = 'var(--' + name + ')'
    }
  }

  return variables
}

export default function createTheme(properties, prefix = '') {
  const theme = { ...properties }
  const variables = extractVariables(theme, prefix)

  return [theme, variables]
}
