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
          ['width', 'height'],
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
        ':hover': {
          appearance: 'button',
          position: 'absolute',
          width: 'auto',
        },
      })
    ).toMatchSnapshot()
  })
})
