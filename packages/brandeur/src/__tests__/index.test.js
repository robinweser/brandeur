import beautify from 'cssbeautify'
import prefixer from 'brandeur-plugin-prefixer'

import brandeur from '../index'
import fallbackValue from '../fallbackValue'

describe('Using brandeur', () => {
  it('should work', () => {
    const [staticCSS, css] = brandeur({
      hooks: {
        ':hover': ':hover',
      },
      plugins: [prefixer()],
      fallbacks: [fallbackValue('position', ['-webkit-sticky', 'sticky'])],
    })

    expect(beautify(staticCSS)).toMatchSnapshot()
    expect(
      css({
        color: 'red',
        appearance: 'none',
        position: 'sticky',
        ':hover': {
          appearance: 'button',
          position: 'absolute',
        },
      })
    ).toMatchSnapshot()
  })
})
