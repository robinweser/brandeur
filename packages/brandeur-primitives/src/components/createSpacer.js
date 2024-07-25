import React from 'react'

import applyMultiplier from '../utils/applyMultiplier.js'

function getDisplayBySize(size) {
  return size === 0 ? 'none' : 'flex'
}

export default function createSpacer({ El, baselineGrid = 1 }) {
  return function Spacer({ size = 1 }) {
    const spacing = applyMultiplier(baselineGrid)
    const space = spacing(size)

    const display = Array.isArray(space)
      ? space.map(getDisplayBySize)
      : getDisplayBySize(space)

    return <El style={{ display, width: space, flexBasis: space }} />
  }
}
