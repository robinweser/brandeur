/* eslint-disable react/prop-types */
import React from 'react'
import css from './css'

const viewStyle = {
  alignItems: 'stretch',
  borderWidth: 0,
  borderStyle: 'solid',
  boxSizing: 'border-box',
  display: 'flex',
  flexBasis: 'auto',
  flexDirection: 'column',
  flexShrink: 0,
  margin: 0,
  padding: 0,
  position: 'relative',
  // fix flexbox bugs
  minHeight: 0,
  minWidth: 0,
}

export default function View({ style, ...other }) {
  return <div {...other} style={css({ ...viewStyle, ...style })} />
}
