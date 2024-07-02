declare module 'brandeur-plugin-sort-property' {
  import { Style } from 'brandeur'

  type Config = {
    [Property in keyof Style]: number
  }

  export default function enforceLonghand(
    config?: Config
  ): (style: Style) => Style
}
