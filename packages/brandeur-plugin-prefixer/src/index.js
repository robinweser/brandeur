import isObject from 'isobject'

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const w = 'Webkit'
const m = 'Moz'

const prefixes = {
  textEmphasisPosition: w,
  textEmphasis: w,
  textEmphasisStyle: w,
  textEmphasisColor: w,
  boxDecorationBreak: w,
  maskImage: w,
  maskMode: w,
  maskRepeat: w,
  maskPosition: w,
  maskClip: w,
  maskOrigin: w,
  maskSize: w,
  maskComposite: w,
  mask: w,
  maskBorderSource: w,
  maskBorderMode: w,
  maskBorderSlice: w,
  maskBorderWidth: w,
  maskBorderOutset: w,
  maskBorderRepeat: w,
  maskBorder: w,
  maskType: w,
  appearance: w,
  userSelect: w,
  backdropFilter: w,
  clipPath: w,
  hyphens: w,
  textOrientation: w,
  tabSize: m,
  fontKerning: w,
  textSizeAdjust: w,
  textDecorationStyle: w,
  textDecorationSkip: w,
  textDecorationLine: w,
  textDecorationColor: w,
}

export default function prefixerPlugin() {
  return function addVendorPrefixes(style) {
    for (let property in style) {
      const value = style[property]

      if (isObject(value)) {
        style[property] = addVendorPrefixes(value)
      } else {
        if (prefixes[property]) {
          delete style[property]
          style[prefixes[property] + capitalize(property)] = value
          style[property] = value
        }
      }
    }

    return style
  }
}

// TODO: add fallbacks
export const fallbacks = []
