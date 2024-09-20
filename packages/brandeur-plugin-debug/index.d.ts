declare module 'brandeur-plugin-debug' {
  import { Style } from 'brandeur'

  type Config = {
    enabled?: boolean
    position?: 1 | 2 | 3 | 4
    color?: string
    debugWith?: 'border' | 'background'
    borderSize?: number
    showText?: boolean
    styles?: Style
  }
  export default function debug(
    autoActive?: boolean,
    config?: Config
  ): (style: Style) => Style
}
