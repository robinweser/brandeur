declare module 'brandeur-plugin-responsive-value' {
  import { Style } from 'brandeur'

  export type Responsive<T> = T | (T | undefined)[]

  export type ResponsiveStyle<T = Style> = {
    [P in keyof T]: Responsive<T[P]>
  }

  export default function responsiveValue<T = Style>(
    mediaQueries: Array<`@media ${string}`>
  ): (style: ResponsiveStyle<T>) => Style
}
