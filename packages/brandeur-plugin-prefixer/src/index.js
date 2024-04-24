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
    const prefixed = {}

    for (const property in style) {
      const value = style[property]

      if (isObject(value)) {
        prefixed[property] = addVendorPrefixes(value)
      } else {
        if (prefixes[property]) {
          prefixed[prefixes[property] + capitalize(property)] = value
        }

        prefixed[property] = value
      }
    }

    return prefixed
  }
}

export const fallbacks = [
  {
    property: [
      'width',
      'minWidth',
      'maxWidth',
      'height',
      'minHeight',
      'maxHeight',
    ],
    values: ['-webkit-min-content', 'min-content'],
  },
  {
    property: [
      'width',
      'minWidth',
      'maxWidth',
      'height',
      'minHeight',
      'maxHeight',
    ],
    values: ['-webkit-max-content', 'max-content'],
  },
]
