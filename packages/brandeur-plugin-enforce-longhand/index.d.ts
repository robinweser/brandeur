declare module 'brandeur-plugin-enforce-longhand' {
  import { Style } from 'brandeur'

  type Config = {
    borderMode: 'none' | 'directional' | 'longhand'
  }
  export default function enforceLonghand(
    config?: Config
  ): (style: Style) => Style
}
