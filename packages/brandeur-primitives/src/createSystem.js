import { createHooks } from 'brandeur'

import createEl from './components/createEl.js'

export default function createSystem(css, { baselineGrid = 1 } = {}) {
  const El = createEl(css)

  return {
    El,
    baselineGrid,
    css,
  }
}
