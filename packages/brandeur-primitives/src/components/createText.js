import React, { forwardRef } from 'react'

function getVariantStyle(typography = {}, variant) {
  return function getPropertyStyle(property) {
    const responsiveVariant = [].concat(variant)

    return responsiveVariant.map((variant) => {
      const theme = typography?.[variant]

      if (theme) {
        if (theme.hasOwnProperty(property)) {
          return theme[property]
        }
        return 'inherit'
      }
    })
  }
}

export default function createText({ El }, typography) {
  return forwardRef(function Text(
    {
      variant,
      color,
      weight,
      decoration,
      size,
      height,
      children,
      style,
      ...props
    },
    ref
  ) {
    const getPropertyStyle = getVariantStyle(typography, variant)

    return (
      <El
        ref={ref}
        {...props}
        style={[
          {
            '--tehlu_text-size': size || getPropertyStyle('fontSize'),
            fontFamily: getPropertyStyle('fontFamily'),
            fontVariant: getPropertyStyle('fontVariant'),
            fontStretch: getPropertyStyle('fontStretch'),
            color: color || getPropertyStyle('color'),
            fontWeight: weight || getPropertyStyle('fontWeight'),
            textDecoration: decoration || getPropertyStyle('textDecoration'),
            lineHeight: height || getPropertyStyle('lineHeight'),
            display: 'var(--tehlu_text-inner-display, block)',
            fontSize: 'var(--tehlu_text-size, 1rem)',
          },
          style,
        ]}>
        <span
          style={{
            display: 'contents',
            '--tehlu_text-inner-display': 'inline-block',
          }}>
          {children}
        </span>
      </El>
    )
  })
}
