declare module 'brandeur-plugin-prefixer' {
  import { Style } from 'brandeur'

  export default function prefixer(): (style: Style) => Style
}
