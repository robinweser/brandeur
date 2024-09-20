declare module 'brandeur-plugin-sort-property' {
  import { Style } from 'brandeur'

  type PropertyPriority = {
    [Property in keyof Style]: number
  }

  export default function enforceLonghand(
    propertyPriority?: PropertyPriority
  ): (style: Style) => Style
}
