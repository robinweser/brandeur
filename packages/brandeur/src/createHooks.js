import { createHooks as baseCreateHooks } from '@css-hooks/react'
import { cssifyObject } from 'css-in-js-utils'

import fallbackValuePlugin from './fallbackValuePlugin'
import getFallbackVariable from './getFallbackVariable'

function processStyle(style, plugins) {
  return plugins.reduce((processed, plugin) => plugin(processed), style)
}

function resolveStyle(style, theme, keyframes) {
  if (typeof style === 'function') {
    return style({ theme, keyframes })
  }

  return style
}

function getFallbackCSS(fallbacks) {
  const rootCSS = fallbacks.reduce((css, { property, match }) => {
    // use the last value as a default matcher if no match is provided
    const actualMatch = match || values[values.length - 1]

    return (
      css +
      []
        .concat(property)
        .map((prop) => `${getFallbackVariable(prop, actualMatch)}:;`)
        .join('')
    )
  }, '')

  const supportsCSS = fallbacks.map(({ property, values = [], match }) => {
    // use the last value as a default matcher if no match is provided
    const actualMatch = match || values[values.length - 1]

    return values
      .map((value) =>
        []
          .concat(property)
          .map(
            (prop) =>
              `@supports (${prop}:${value}){:root{${getFallbackVariable(prop, actualMatch)}:${value}}}`
          )
          .join('')
      )
      .join('')
  })

  return (rootCSS ? `:root {${rootCSS}}` : '') + supportsCSS.join('')
}

function cssifyKeyframe(animationName, frames) {
  const keyframe = cssifyKeyframeRule(frames)

  return `@keyframes ${animationName}{${keyframe}}`
}

function cssifyKeyframeRule(frames) {
  return Object.keys(frames).reduce(
    (css, percentage) =>
      `${css}${percentage}{${cssifyObject(frames[percentage])}}`,
    ''
  )
}

function getKeyframesCSS(keyframes) {
  return Object.keys(keyframes).reduce(
    (css, animationName) =>
      css + cssifyKeyframe(animationName, keyframes[animationName]),
    ''
  )
}

export default function createHooks({
  hooks,
  plugins = [],
  fallbacks = [],
  keyframes = {},
  theme = {},
}) {
  if (fallbacks.length > 0) {
    plugins.push(fallbackValuePlugin(fallbacks))
  }

  const [baseCSS, fn] = baseCreateHooks(hooks)
  const fallbackCSS = getFallbackCSS(fallbacks)
  const keyframesCSS = getKeyframesCSS(keyframes)

  const staticCSS = keyframesCSS + fallbackCSS + baseCSS

  const keyframeNames = Object.keys(keyframes).reduce(
    (keyframeNames, animationName) => ({ [animationName]: animationName }),
    {}
  )

  function css(...styles) {
    return fn(
      ...styles.map((style) =>
        processStyle(resolveStyle(style, theme, keyframeNames), plugins)
      )
    )
  }

  return [staticCSS, css]
}
