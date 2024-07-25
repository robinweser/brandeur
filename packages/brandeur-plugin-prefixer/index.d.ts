declare module 'brandeur-plugin-prefixer' {
  import { Style, Fallback } from 'brandeur'

  export default function prefixer(): (style: Style) => Style

  export const fallbacks: Array<Fallback>
}
