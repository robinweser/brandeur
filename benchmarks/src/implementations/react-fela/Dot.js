/* eslint-disable react/prop-types */
import React from 'react'
import { useFela } from 'react-fela'

const rule = ({ size, x, y, color }) => ({
  position: 'absolute',
  cursor: 'pointer',
  width: 0,
  height: 0,
  borderColor: 'transparent',
  borderStyle: 'solid',
  borderTopWidth: 0,
  transform: 'translate(50%, 50%)',
  borderBottomColor: color,
  borderRightWidth: size / 2,
  borderBottomWidth: size / 2,
  borderLeftWidth: size / 2,
  marginLeft: x,
  marginTop: y,
})

const Dot = ({ size, x, y, color, children }) => {
  const { css } = useFela({ size, x, y, color })

  return <div className={css(rule)}>{children}</div>
}

export default Dot
