import fallbackValuePlugin from '../fallbackValuePlugin'
import fallbackValue from '../fallbackValue'

describe('Using the fallback value plugin', () => {
  it('should replace fallback values with their generated CSS variable', () => {
    const resolve = fallbackValuePlugin([
      fallbackValue('position', ['-webkit-sticky', 'sticky']),
    ])

    expect(resolve({ position: 'sticky', color: 'red' })).toEqual({
      position: 'var(--position-sticky)',
      color: 'red',
    })

    expect(
      resolve({
        color: 'red',
        ':hover': {
          position: 'sticky',
        },
      })
    ).toEqual({
      color: 'red',
      ':hover': {
        position: 'var(--position-sticky)',
      },
    })
  })

  it('should support multiple properties', () => {
    const resolve = fallbackValuePlugin([
      fallbackValue(
        ['width', 'height'],
        ['-webkit-min-content', 'min-content']
      ),
    ])

    expect(
      resolve({ width: 'min-content', height: 'min-content', color: 'red' })
    ).toEqual({
      width: 'var(--width-min-content)',
      height: 'var(--height-min-content)',
      color: 'red',
    })
  })
})
