import beautify from 'cssbeautify'

import createHooks from '../createHooks'
import fallbackValue from '../fallbackValue'

describe('Creating hooks', () => {
  it('should support multiple styles', () => {
    const [_, css] = createHooks({
      hooks: {
        ':hover': ':hover',
      },
    })

    expect(css({ color: 'red' }, { fontSize: 16 })).toEqual({
      color: 'red',
      fontSize: 16,
    })
  })

  it('should support nested arrays of styles', () => {
    const [_, css] = createHooks({
      hooks: {
        ':hover': ':hover',
      },
    })

    expect(
      css(
        [
          { color: 'red', padding: 5 },
          { fontSize: 16 },
          [{ color: 'blue', backgroundColor: 'red' }, { lineHeight: 1 }],
        ],
        { padding: 10 }
      )
    ).toEqual({
      padding: 10,
      color: 'blue',
      backgroundColor: 'red',
      fontSize: 16,
      lineHeight: 1,
    })
  })

  it('should support fallbacks', () => {
    const [staticCSS, css] = createHooks({
      hooks: {
        ':hover': ':hover',
      },
      fallbacks: [
        fallbackValue('position', ['-webkit-sticky', 'sticky']),
        fallbackValue(
          ['width', 'minWidth'],
          ['-webkit-min-content', 'min-content']
        ),
      ],
    })

    expect(beautify(staticCSS)).toMatchSnapshot()
    expect(
      css({
        color: 'red',
        appearance: 'none',
        position: 'sticky',
        width: 'min-content',
        minWidth: 'min-content',
        ':hover': {
          appearance: 'button',
          position: 'absolute',
          width: 'auto',
        },
      })
    ).toMatchSnapshot()
  })

  it('should support keyframes', () => {
    const [staticCSS, css] = createHooks({
      hooks: {
        ':hover': ':hover',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    })

    expect(beautify(staticCSS)).toMatchSnapshot()
    expect(
      css(({ keyframes }) => ({
        animationName: keyframes.fadeIn,
      }))
    ).toEqual({
      animationName: 'fadeIn',
    })
  })

  it('should support themes', () => {
    const [staticCSS, css] = createHooks({
      hooks: {
        ':hover': ':hover',
      },
      themes: {
        light: {
          colors: {
            primary: 'red',
          },
        },
        dark: {
          colors: {
            primary: 'blue',
          },
        },
      },
    })

    expect(beautify(staticCSS)).toMatchSnapshot()
    expect(
      css(({ theme }) => ({
        color: theme.colors.primary,
      }))
    ).toEqual({
      color: 'var(--colors-primary)',
    })
  })

  it('should support themes in multiple styles', () => {
    const [staticCSS, css] = createHooks({
      hooks: {
        ':hover': ':hover',
      },
      themes: {
        light: {
          colors: {
            primary: 'red',
          },
        },
        dark: {
          colors: {
            primary: 'blue',
          },
        },
      },
    })

    expect(beautify(staticCSS)).toMatchSnapshot()
    expect(
      css({ fontSize: 12 }, [
        { backgroundColor: 'blue' },
        ({ theme }) => ({ color: theme.colors.primary }),
      ])
    ).toEqual({
      backgroundColor: 'blue',
      fontSize: 12,
      color: 'var(--colors-primary)',
    })
  })
})
