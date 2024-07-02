import { createHooks as baseCreateHooks } from '@css-hooks/react'
import { cssifyObject, hyphenateProperty, assignStyle } from 'css-in-js-utils'
import { arrayMap, arrayReduce } from 'fast-loops'

import fallbackValuePlugin from './fallbackValuePlugin.js'
import getFallbackVariable from './getFallbackVariable.js'

function processStyle(style, plugins) {
  return arrayReduce(plugins, (processed, plugin) => plugin(processed), style)
}

function resolveStyle(style, theme, keyframes) {
  if (style instanceof Function) {
    return style({ theme, keyframes })
  }

  return style
}

function getFallbackCSS(fallbacks) {
  const rootCSS = fallbacks.reduce((css, { property, values = [], match }) => {
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
              `@supports (${hyphenateProperty(prop)}:${value}){:root{${getFallbackVariable(prop, actualMatch)}:${value}}}`
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
  config = {},
  plugins = [],
  fallbacks = [],
  keyframes = {},
  theme = {},
  mergeStyle = assignStyle,
}) {
  if (fallbacks.length > 0) {
    plugins.push(fallbackValuePlugin(fallbacks))
  }

  const [baseCSS, fn] = baseCreateHooks(hooks, config)
  const fallbackCSS = getFallbackCSS(fallbacks)
  const keyframesCSS = getKeyframesCSS(keyframes)

  const staticCSS = keyframesCSS + fallbackCSS + baseCSS

  const keyframeNames = Object.keys(keyframes).reduce(
    (keyframeNames, animationName) => ({ [animationName]: animationName }),
    {}
  )

  function css(...styles) {
    const flattened = styles.flat(Infinity)
    const filtered = flattened.filter(Boolean)
    const resolved = arrayMap(filtered, (style) =>
      resolveStyle(style, theme, keyframeNames)
    )

    const merged = mergeStyle({}, ...filtered)
    const processed = processStyle(merged, plugins)

    return fn(processed)
  }

  return [staticCSS, css]
}
