'use client'
import React, { forwardRef } from 'react'

const buttonStyle = ({ disabled }) => ({
  backgroundColor: 'unset',
  backgroundImage: 'unset',
  margin: 0,
  padding: 0,
  textAlign: 'left',
  cursor: 'pointer',
  appearance: 'none',
  borderWidth: 0,
  touchAction: 'manipulation',
  color: 'inherit',
  // TODO: not supported
  // '::-moz-focus-inner': {
  //   borderWidth: 0,
  //   padding: 0,
  // },
  extend: [
    {
      condition: disabled,
      style: {
        cursor: 'not-allowed',
      },
    },
    {
      condition: !disabled,
      style: {
        ':active': {
          color: 'inherit',
        },
      },
    },
  ],
})

const linkStyle = ({ disabled }) => ({
  textDecoration: 'none',
  color: 'inherit',
  extend: [
    {
      condition: disabled,
      style: {
        cursor: 'not-allowed',
      },
    },
    {
      condition: !disabled,
      style: {
        ':active': {
          color: 'inherit',
        },
      },
    },
  ],
})

export default function createClick({ El }, linkComponent = 'a') {
  return forwardRef(function Click(
    { action, target, disabled, type = 'button', style, children, ...props },
    ref
  ) {
    const isLink = typeof action === 'string' || typeof action === 'object'
    const as = isLink ? linkComponent : 'button'

    function getStyle(componentStyle) {
      return [{ boxSizing: 'border-box' }, componentStyle({ disabled }), style]
    }

    function getProps() {
      if (isLink) {
        const rel = target === '_blank' ? 'noreferrer noopener' : undefined
        const style = getStyle(linkStyle)

        return {
          href: !disabled ? action : undefined,
          style,
          target,
          rel,
        }
      }

      const style = getStyle(buttonStyle)

      return {
        onClick: !disabled ? action : undefined,
        style,
        disabled,
        type,
      }
    }

    const additionalProps = getProps()

    return (
      <El
        ref={ref}
        onTouchStart={() => {}}
        {...props}
        {...additionalProps}
        as={as}
      >
        {children}
      </El>
    )
  })
}
