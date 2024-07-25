declare module 'brandeur' {
  import { CSSProperties } from 'react'
  import { createHooks as createBaseHooks } from '@css-hooks/react'
  import { WithHooks } from '@css-hooks/core'

  export type Style = CSSProperties
  export type PluginProperties<T> = T extends (_: infer Arg) => unknown
    ? Arg
    : Style

  export type Fallback = {
    property: string | Array<string>
    values: Array<string>
    match?: string
  }

  type HookOptions<Hooks extends string> = Parameters<
    typeof createBaseHooks<Hooks>
  >[0]

  export type Config<Hooks extends string, Theme, Plugins> = {
    hooks: HookOptions<Hooks>
    config?: Object
    theme?: Theme
    plugins?: Plugins
    fallbacks?: Array<Fallback>
  }

  export type Properties<Hooks, Plugins = []> = WithHooks<
    Hooks,
    Style | PluginProperties<Plugins[number]>
  >

  export type Rule<Theme, Props> = (theme: Theme) => Props
  export type Rules<Theme, Props> =
    | undefined
    | Props
    | Rule<Theme, Props>
    | Array<Rules<Theme, Props>>

  type CSSFunction<Theme, Props> = (
    properties_0: Rules<Theme, Props>,
    ...properties_1: (Rules<Theme, Props> | undefined)[]
  ) => CSSProperties

  export function createHooks<Hooks extends string, Theme = {}, Plugins = []>(
    config: Config<Hooks, Theme, Plugins>
  ): [string, CSSFunction<Theme, Properties<Hooks, Plugins>>]
}

declare module 'fela-plugin-bidi' {
  import { Style } from 'brandeur'

  export default function bidi(
    direction?: 'ltr' | 'rtl'
  ): (style: Style) => Style
}

declare module 'fela-plugin-custom-property' {
  import { Style } from 'brandeur'

  export default function customProperty<P extends Record<string, any>>(
    properties: P
  ): (
    style: Partial<{
      [Property in keyof P]: Parameters<P[Property]>[0]
    }>
  ) => Style
}

declare module 'fela-plugin-expand-shorthand' {
  import { Style } from 'brandeur'

  export default function expandShorthand(): (style: Style) => Style
}

declare module 'fela-plugin-extend' {
  import { Style } from 'brandeur'
  import { WithHooks } from '@css-hooks/core'

  type Extension<T, Hooks> = {
    condition: boolean
    style: ExtendStyle<T, Hooks>
  }

  type ExtendStyle<T, Hooks> = WithHooks<Hooks, T> & {
    extend?: Extension<T, Hooks> | Array<Extension<T, Hooks>>
  }

  export default function extend<Hooks, T = Style>(): (
    style: ExtendStyle<T, keyof Hooks>
  ) => Style
}

declare module 'fela-plugin-hover-media' {
  import { Style } from 'brandeur'

  export default function hoverMedia(): (style: Style) => Style
}

declare module 'fela-plugin-important' {
  import { Style } from 'brandeur'

  export default function important(): (style: Style) => Style
}

declare module 'fela-plugin-isolation' {
  import { Style } from 'brandeur'

  type Config = {
    exclude: Array<keyof Style>
  }
  export default function isolation(config?: Config): (style: Style) => Style
}

declare module 'fela-plugin-kebab-case' {
  import { Style } from 'brandeur'

  export default function kebabCase(): (style: Style) => Style
}

declare module 'fela-plugin-logger' {
  import { Style } from 'brandeur'

  export default function logger(): (style: Style) => Style
}

declare module 'fela-plugin-rtl' {
  import { Style } from 'brandeur'

  export default function rtl(
    direction?: 'ltr' | 'rtl'
  ): (style: Style) => Style
}

declare module 'fela-plugin-unit' {
  import { Style } from 'brandeur'

  type Unit =
    | 'ch'
    | 'em'
    | 'ex'
    | 'rem'
    | 'vh'
    | 'vw'
    | 'vmin'
    | 'vmax'
    | 'px'
    | 'cm'
    | 'mm'
    | 'in'
    | 'pc'
    | 'pt'
    | 'mozmm'

  export default function unit(
    unit?: Unit,
    unitPerProperty?: { [P in keyof Style]: Unit },
    isUnitlessProperty?: (property: string) => boolean
  ): (style: Style) => Style
}

declare module 'fela-plugin-validator' {
  import { Style } from 'brandeur'

  type Config = {
    logInvalid?: boolean
    deleteInvalid?: boolean
    useCSSLint?: boolean
  }
  export default function validator(config?: Config): (style: Style) => Style
}
