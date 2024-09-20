declare module 'brandeur-primitives' {
  import { Style } from 'brandeur'
  import {
    ComponentProps,
    ComponentType,
    ComponentPropsWithRef,
    ElementType,
    RefAttributes,
    JSX,
  } from 'react'

  type DistributiveOmit<T, E extends PropertyKey> = T extends any
    ? Omit<T, E>
    : never

  type ElProps<E, Style> = {
    style?: Style
    as?: E | undefined
  } & DistributiveOmit<
    ComponentPropsWithRef<ElementType extends E ? 'div' : E>,
    'as' | 'style'
  > &
    RefAttributes<any>

  type Options<T> = {
    css: T
    baselineGrid?: number
  }

  export function createSystem<T>(config: Options<T>): {
    El: <E extends ElementType>(
      props: ElProps<E, Parameters<T>[0]>
    ) => JSX.Element
    styleSheet: string
    css: T
  }

  type SystemStyle<T> = ComponentProps<T['El']>['style']

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
  export function createBox<S = Style, System>(
    system: System
  ): <E extends ElementType>(
    props: ElProps<E, SystemStyle<System>> & BoxProps<S>
  ) => JSX.Element

  type GridProps<T> = {
    columns?: T['gridTemplateColumns']
    gap?: T['gap']
    areas?: T['gridTemplateAreas']
  }
  export function createGrid<S = Style, System>(
    system: System
  ): <E extends ElementType>(
    props: ElProps<E, SystemStyle<System>> & GridProps<S>
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
  export function createClick<System, L extends ElementType = 'a'>(
    system: System,
    linkComponent?: L
  ): <E extends ElementType>(
    props: ElProps<E, SystemStyle<System>> & ClickProps<L>
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
  export function createOverlay<S = Style, System>(
    system: System
  ): <E extends ElementType>(
    props: ElProps<E, SystemStyle<System>> & OverlayProps<S>
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
  export function createText<S = Style, System, Typography>(
    system: System,
    typography: Typography
  ): <E extends ElementType>(
    props: ElProps<E, SystemStyle<System>> & TextProps<S, Typography>
  ) => JSX.Element

  type SpacerProps<T> = {
    size: T['width']
  }
  export function createSpacer<S = Style, System>(
    system: System
  ): <E extends ElementType>(
    props: ElProps<E, SystemStyle<System>> & SpacerProps<S>
  ) => JSX.Element

  export function createVisuallyHidden<System>(
    system: System
  ): ComponentType<PropsWithChildren>
}
