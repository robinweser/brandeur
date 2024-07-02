import React from 'react'

const style = {
  clip: 'rect(1px, 1px, 1px, 1px)',
  clipPath: 'inset(50%)',
  position: 'absolute',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  border: 0,
  padding: 0,
  height: 1,
  width: 1,
}

export default function createVisuallyHidden({ El }) {
  return function VisuallyHidden({ children }) {
    return <El style={style}>{children}</El>
  }
}
