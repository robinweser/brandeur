import { createHooks } from '@css-hooks/react'
import { recommended } from '@css-hooks/recommended'
import { cssifyObject } from 'css-in-js-utils'
import extend from 'fela-plugin-extend'
import responsiveValue from 'fela-plugin-responsive-value'
import { objectReduce, arrayReduce } from 'fast-loops'

export function keyframe(animationName, frames) {
  return {
    animationName,
    frames,
  }
}

export function staticStyle(style, selector, query) {
  return { style, selector, query }
}

function cssifyStaticStyle(style, selector, query = '') {
  const declaration = selector + '{' + cssifyObject(style) + '}'

  if (query) {
    return query + '{' + declaration + '}'
  }

  return declaration
}

function cssifyKeyframe(animationName, frames, prefixes = ['']) {
  const keyframe = cssifyKeyframeRule(frames)

  return `@keyframes ${animationName}{${keyframe}}`
}

function cssifyKeyframeRule(frames) {
  return objectReduce(
    frames,
    (css, frame, percentage) => `${css}${percentage}{${cssifyObject(frame)}}`,
    ''
  )
}

export const responsiveProps = {
  padding: true,
  paddingLeft: true,
  paddingRight: true,
  paddingBottom: true,
  paddingTop: true,
  margin: true,
  marginLeft: true,
  marginRight: true,
  marginBottom: true,
  marginTop: true,
  width: true,
  height: true,
  minWidth: true,
  minHeight: true,
  maxWidth: true,
  maxHeight: true,
  flex: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: true,
  alignSelf: true,
  alignItems: true,
  alignContent: true,
  justifyContent: true,
  flexDirection: true,
  flexWrap: true,
  order: true,
  display: true,
  gridTemplateColumns: true,
  backgroundColor: true,
}

const breakpoints = {
  small: '@media (min-width: 480px)',
  medium: '@media (min-width: 800px)',
  large: '@media (min-width: 1024px)',
  huge: '@media (min-width: 1400px)',
}

const getResponsiveMediaQueries = (values, props) => {
  const { small, medium, large, huge } = breakpoints

  const mediaQueryMap = {
    1: [],
    2: [small],
    3: [small, medium],
    4: [small, medium, large],
    5: [small, medium, large, huge],
  }

  return mediaQueryMap[values.length]
}


export const [hooks, css] = brandeur({
  hooks: {
    ...recommended({}),
    ...Object.keys(breakpoints).reduce(
      (obj, key) => ({ ...obj, [breakpoints[key]]: breakpoints[key] }),
      {}
    ),
  },
  plugins: [
    extend(),
    prefixer(),
    responsiveValue(getResponsiveMediaQueries, responsiveProps),
    enforceLonghands(),
  ],
  fallbacks: [
    fallbackValue('position', ['-webkit-sticky', 'sticky'], 'sticky'),
  ],
  keyframes: [
    keyframe('rotate', {
      from: {
        transform: 'rotate(0deg)',
      },
      to: {
        transform: 'rotate(360deg)',
      },
    }),
  ],
  globals: [
    staticStyle(
      {
        padding: '20px',
        color: 'red',
      },
      'div'
    ),
  ],
  theme: {
    colors: {
      foreground: {
        primary: 'purple',
      },
    },
  },
})
