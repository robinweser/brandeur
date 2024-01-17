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
})
