declare module 'brandeur-primitives' {
  import { Config, Style, Rules, PluginProperties, Properties } from 'brandeur'
  import {
    ComponentProps,
    ComponentPropsWithRef,
    PropsWithChildren,
    ComponentType,
    ElementType,
    RefAttributes,
    JSX,
  } from 'react'

  type DistributiveOmit<T, E extends PropertyKey> = T extends any
    ? Omit<T, E>
    : never

  type Options<Hooks extends string, Theme, Plugins> = Config<
    Hooks,
    Theme,
    Plugins
  > & {
    baselineGrid?: number
  }

  type ElProps<E, Hooks, Theme, Plugins extends Array<any>> = {
    style?: Rules<Theme, Properties<Hooks, Plugins>>
    as?: E | undefined
  } & DistributiveOmit<
    ComponentPropsWithRef<ElementType extends E ? 'div' : E>,
    'as' | 'style'
  > &
    RefAttributes<any>

  export function createSystem<
    Hooks extends string,
    Theme = {},
    Plugins extends Array<any> = [],
  >(
    config: Config<Hooks, Theme, Plugins>
  ): {
    El: <E extends ElementType>(
      props: ElProps<E, Hooks, Theme, Plugins>
    ) => JSX.Element
    baselineGrid: number
    plugins: Plugins
    theme: Theme
    hooks: Hooks
  }

  type System<
    Hooks extends string,
    Theme,
    Plugins extends Array<any>,
  > = ReturnType<typeof createSystem<Hooks, Theme, Plugins>>

  type UnionToIntersection<T> = (
    T extends any ? (x: T) => any : never
  ) extends (x: infer R) => any
    ? R
    : never

  type MergeProperties<T, U> = {
    [K in keyof T | keyof U]: K extends keyof T
      ? K extends keyof U
        ? T[K] | U[K]
        : T[K]
      : K extends keyof U
        ? U[K]
        : never
  }

  type Props<T extends Array<any>> = MergeProperties<
    Style,
    UnionToIntersection<PluginProperties<T[number]>>
  >

  type BoxProps<T> = {
    bg?: T['backgroundColor']
    backgroundColor?: T['backgroundColor']
    overflow?: T['overflow']
    position?: T['position']
    display?: T['display']
    height?: T['height']
    minHeight?: T['minHeight']
    maxHeight?: T['height']
    width?: T['width']
    minWidth?: T['minWidth']
    maxWidth?: T['maxWidth']
    wrap?: T['flexWrap']
    grow?: T['flexGrow']
    shrink?: T['flexShrink']
    basis?: T['flexBasis']
    flex?: T['flex']
    order?: T['order']
    direction?: T['flexDirection']
    alignItems?: T['alignItems']
    alignContent?: T['alignContent']
    alignSelf?: T['alignSelf']
    justifyContent?: T['justifyContent']
    gap?: T['gap']
    padding?: T['padding']
    paddingInline?: T['paddingInline']
    paddingInlineStart?: T['paddingInlineStart']
    paddingInlineEnd?: T['paddingInlineEnd']
    paddingBlock?: T['paddingBlock']
    paddingBlockStart?: T['paddingBlockStart']
    paddingBlockEnd?: T['paddingBlockEnd']
    paddingTop?: T['paddingTop']
    paddingRight?: T['paddingRight']
    paddingBottom?: T['paddingBottom']
    paddingLeft?: T['paddingLeft']
    margin?: T['margin']
    marginInline?: T['marginInline']
    marginInlineStart?: T['marginInlineStart']
    marginInlineEnd?: T['marginInlineEnd']
    marginBlock?: T['marginBlock']
    marginBlockStart?: T['marginBlockStart']
    marginBlockEnd?: T['marginBlockEnd']
    marginTop?: T['marginTop']
    marginRight?: T['marginRight']
    marginBottom?: T['marginBottom']
    marginLeft?: T['marginLeft']
  }

  export function createBox<
    Hooks extends string,
    Theme = {},
    Plugins extends Array<any> = [],
  >(
    system: System<Hooks, Theme, Plugins>
  ): <E extends ElementType>(
    props: ElProps<E, Hooks, Theme, Plugins> & BoxProps<Props<Plugins>>
  ) => JSX.Element

  type GridProps<T> = {
    columns?: T['gridTemplateColumns']
    gap?: T['gap']
    areas?: T['gridTemplateAreas']
  }
  export function createGrid<
    Hooks extends string,
    Theme = {},
    Plugins extends Array<any> = [],
  >(
    system: System<Hooks, Theme, Plugins>
  ): <E extends ElementType>(
    props: ElProps<E, Hooks, Theme, Plugins> & GridProps<Props<Plugins>>
  ) => JSX.Element

  type ClickButtonProps = {
    disabled?: HTMLButtonElement['disabled']
    type?: HTMLButtonElement['type']
  }

  type ClickLinkProps<T extends ElementType> = {
    action: ComponentProps<T>['href']
    target?: HTMLAnchorElement['target']
  }
  type ClickProps<T extends ElementType> = ClickButtonProps | ClickLinkProps<T>

  export function createClick<
    Hooks extends string,
    Theme = {},
    Plugins extends Array<any> = [],
    T extends ElementType = 'a',
  >(
    system: System<Hooks, Theme, Plugins>,
    linkComponent?: T
  ): <E extends ElementType>(
    props: ElProps<E, Hooks, Theme, Plugins> & ClickProps<T>
  ) => JSX.Element

  type OverlayProps<T> = {
    visible: boolean
    zIndex: T['zIndex']
    top?: T['top']
    right?: T['right']
    bottom?: T['bottom']
    left?: T['left']
    inset?: T['inset']
  }
  export function createOverlay<
    Hooks extends string,
    Theme = {},
    Plugins extends Array<any> = [],
  >(
    system: System<Hooks, Theme, Plugins>
  ): <E extends ElementType>(
    props: ElProps<E, Hooks, Theme, Plugins> & OverlayProps<Props<Plugins>>
  ) => JSX.Element

  type Typography = {
    [variant: string]: Style
  }

  type TextProps<T, Typography> = {
    variant?: keyof Typography
    color?: T['color']
    weight?: T['fontWeight']
    align?: T['textAlign']
    decoration?: T['textDecoration']
    size?: T['fontSize']
    height?: T['lineHeight']
  }

  export function createText<
    Typography,
    Hooks extends string,
    Theme = {},
    Plugins extends Array<any> = [],
  >(
    system: System<Hooks, Theme, Plugins>,
    typography: Typography
  ): <E extends ElementType>(
    props: ElProps<E, Hooks, Theme, Plugins> &
      TextProps<Props<Plugins>, Typography>
  ) => JSX.Element

  type SpacerProps<T> = {
    size: T['width']
  }
  export function createSpacer<
    Hooks extends string,
    Theme = {},
    Plugins extends Array<any> = [],
  >(
    system: System<Hooks, Theme, Plugins>
  ): ComponentType<SpacerProps<Props<Plugins>>>

  export function createVisuallyHidden<
    Hooks extends string,
    Theme = {},
    Plugins extends Array<any> = [],
  >(system: System<Hooks, Theme, Plugins>): ComponentType<PropsWithChildren>
}
