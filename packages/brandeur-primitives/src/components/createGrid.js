import React, { forwardRef } from 'react'

import applyMultiplier from '../utils/applyMultiplier.js'

export default function createGrid({ El }, baselineGrid = 1) {
  return forwardRef(function Grid(
    { gap, columns, rows, areas, style, children, ...props },
    ref
  ) {
    const spacing = applyMultiplier(baselineGrid)

    return (
      <El
        ref={ref}
        {...props}
        style={[
          {
            boxSizing: 'border-box',
            display: 'grid',
            gridGap: spacing(gap),
            gridTemplateColumns: columns,
            gridTemplateRows: rows,
            gridTemplateAreas: areas,
          },
          style,
        ]}>
        {children}
      </El>
    )
  })
}
