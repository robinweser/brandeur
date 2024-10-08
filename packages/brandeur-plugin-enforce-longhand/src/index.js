import sortProperty from 'brandeur-plugin-sort-property'

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function getPropertyPriority({
  borderLonghand,
  borderDirectional,
  borderDirectionalLonghand,
}) {
  const propertyPriority = {
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2,
    marginBottom: 2,
    marginInline: 2,
    marginBlock: 2,
    marginInlineStart: 3,
    marginInlineEnd: 3,
    marginBlockStart: 3,
    marginBlockEnd: 3,

    paddingLeft: 2,
    paddingRight: 2,
    paddingBottom: 2,
    paddingTop: 2,
    paddingInline: 2,
    paddingBlock: 2,
    paddingInlineStart: 3,
    paddingInlineEnd: 3,
    paddingBlockStart: 3,
    paddingBlockEnd: 3,

    flexWrap: 2,
    flexShrink: 2,
    flexBasis: 2,
    backgroundColor: 2,
    backgroundRepeat: 2,
    backgroundPosition: 2,
    backgroundImage: 2,
    backgroundOrigin: 2,
    backgroundClip: 2,
    backgroundSize: 2,
    transitionProperty: 2,
    transitionTimingFunction: 2,
    transitionDuration: 2,
    transitionDelay: 2,
    animationDelay: 2,
    animationDirection: 2,
    animationDuration: 2,
    animationFillMode: 2,
    animationIterationCount: 2,
    animationName: 2,
    animationPlayState: 2,
    animationTimingFunction: 2,
    borderWidth: borderLonghand,
    borderStyle: borderLonghand,
    borderColor: borderLonghand,
    // these conflict with the longhands above
    borderTop: borderDirectional,
    borderRight: borderDirectional,
    borderBottom: borderDirectional,
    borderLeft: borderDirectional,
    borderTopWidth: borderDirectionalLonghand,
    borderTopStyle: borderDirectionalLonghand,
    borderTopColor: borderDirectionalLonghand,
    borderRightWidth: borderDirectionalLonghand,
    borderRightStyle: borderDirectionalLonghand,
    borderRightColor: borderDirectionalLonghand,
    borderBottomWidth: borderDirectionalLonghand,
    borderBottomStyle: borderDirectionalLonghand,
    borderBottomColor: borderDirectionalLonghand,
    borderLeftWidth: borderDirectionalLonghand,
    borderLeftStyle: borderDirectionalLonghand,
    borderLeftColor: borderDirectionalLonghand,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderImageOutset: 2,
    borderImageRepeat: 2,
    borderImageSlice: 2,
    borderImageSource: 2,
    borderImageWidth: 2,
    columnWidth: 2,
    columnCount: 2,
    listStyleImage: 2,
    listStylePosition: 2,
    listStyleType: 2,
    outlineWidth: 2,
    outlineStyle: 2,
    outlineColor: 2,
    overflowX: 2,
    overflowY: 2,
    textDecorationLine: 2,
    textDecorationStyle: 2,
    textDecorationColor: 2,
  }
  // Add all possible vendor prefixes to all properties
  // brandeur-plugin-prefixer converts properties to prefixed ones like `WebkitBackgroundColor`
  return Object.entries(propertyPriority).reduce(
    (acc, [property, priority]) => {
      acc['Webkit' + capitalize(property)] = priority

      return acc
    },
    propertyPriority
  )
}

export default function enforceLonghandPlugin(borderMode = 'none') {
  const propertyPriority = getPropertyPriority({
    borderDirectional: borderMode === 'directional' ? 3 : 2,
    borderLonghand: borderMode === 'longhand' ? 3 : 2,
    borderDirectionalLonghand: borderMode === 'none' ? 3 : 4,
  })

  return sortProperty(propertyPriority)
}
