import beautify from 'cssbeautify'

import createHooks from '../createHooks'
import fallbackValue from '../fallbackValue'

describe('Creating hooks', () => {
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
})
