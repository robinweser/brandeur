import React, { forwardRef } from 'react'

export default function createEl(css) {
  return forwardRef(function El(
    { as: Component = 'div', style, ...props },
    ref
  ) {
    return <Component {...props} ref={ref} style={css(style)} />
  })
}
