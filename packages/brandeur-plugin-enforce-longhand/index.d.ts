declare module 'brandeur-plugin-enforce-longhand' {
  import { Style } from 'brandeur'

  export default function enforceLonghand(
    borderMode?: 'none' | 'directional' | 'longhand'
  ): (style: Style) => Style
}
