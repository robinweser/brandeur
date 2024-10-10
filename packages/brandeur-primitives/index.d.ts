declare module 'brandeur-primitives' {
  import { Style } from 'brandeur'
  import {
    ComponentProps,
    ComponentType,
    ComponentPropsWithRef,
    PropsWithChildren,
    ElementType,
    RefAttributes,
    JSX,
  } from 'react'

  type Merge<T, U> = Omit<T, keyof U> & U
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

  type Options = {
    baselineGrid?: number
  }

  export function createSystem<S = Style, T>(
    css: T,
    config?: Options
  ): {
    El: <E extends ElementType>(
      props: ElProps<E, Parameters<T>[0]>
    ) => JSX.Element
    styleSheet: string
    css: T
    __type: S
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
  export function createBox<System>(
    system: System
  ): <E extends ElementType>(
    props: Merge<ElProps<E, SystemStyle<System>>, BoxProps<System['__type']>>
  ) => JSX.Element

  type GridProps<T> = {
    columns?: T['gridTemplateColumns']
    gap?: T['gap']
    areas?: T['gridTemplateAreas']
  }
  export function createGrid<System>(
    system: System
  ): <E extends ElementType>(
    props: Merge<ElProps<E, SystemStyle<System>>, GridProps<System['__type']>>
  ) => JSX.Element

  type ClickActionButtonProps<A> = {
    action: A
  }
  type ClickFormButtonProps = {
    action: null
    type: 'submit' | 'reset'
  }

  type ClickButtonProps<A> = A extends null
    ? ClickFormButtonProps
    : ClickActionButtonProps<A>
  type ClickLinkProps<A> = {
    action: A
  }

  export function createClick<System, L extends ElementType = 'a'>(
    system: System,
    linkComponent?: L
  ): <A extends ComponentProps<L>['href'] | HTMLButtonElement['onclick']>(
    props: Merge<
      Omit<
        ElProps<
          A extends ComponentProps<L>['href'] ? L : 'button',
          SystemStyle<System>
        >,
        'as'
      >,
      ComponentProps<L>['href'] extends A
        ? ClickLinkProps<A>
        : ClickButtonProps<A>
    >
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
  export function createOverlay<System>(
    system: System
  ): <E extends ElementType>(
    props: Merge<
      ElProps<E, SystemStyle<System>>,
      OverlayProps<System['__type']>
    >
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
  export function createText<System, Typography>(
    system: System,
    typography: Typography
  ): <E extends ElementType>(
    props: Merge<
      ElProps<E, SystemStyle<System>>,
      TextProps<System['__type'], Typography>
    >
  ) => JSX.Element

  type SpacerProps<T> = {
    size: T['width']
  }
  export function createSpacer<System>(
    system: System
  ): ComponentType<SpacerProps<System['__type']>>

  type VisuallyHiddenProps = {
    as?: keyof JSX.IntrinsicElements
  }
  export function createVisuallyHidden<System>(
    system: System
  ): ComponentType<PropsWithChildren<VisuallyHiddenProps>>
}
