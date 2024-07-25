import { createHooks } from 'brandeur'

import createEl from './components/createEl.js'

export default function createSystem({
  hooks,
  config,
  theme,
  keyframes,
  fallbacks,
  plugins = [],
  baselineGrid = 1,
} = {}) {
  const [styleSheet, css] = createHooks({
    hooks,
    config,
    theme,
    keyframes,
    fallbacks,
    plugins,
  })

  const El = createEl(css)

  return {
    El,
    baselineGrid,
    styleSheet,
    hooks,
    plugins,
    theme,
  }
}
