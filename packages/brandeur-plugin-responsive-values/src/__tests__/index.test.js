import responsiveValuePlugin from '../index'

describe('Using brandeur-plugin-responsive-values', () => {
  it('should add vendor prefixes where needed', () => {
    const resolve = responsiveValuePlugin([
      '@media (min-width: 320px)',
      '@media (min-width: 680px)',
      '@media (min-width: 1024px)',
    ])

    expect(
      resolve({
        color: ['red', 'blue'],
        fontSize: 16,
        padding: [10, , 3],
      })
    ).toEqual({
      color: 'red',
      fontSize: 16,
      padding: 10,
      '@media (min-width: 320px)': {
        color: 'blue',
      },
      '@media (min-width: 680px)': {
        padding: 3,
      },
    })
    expect(
      resolve({
        color: ['red', 'blue'],
        ':hover': {
          padding: [10, , 3],
        },
      })
    ).toEqual({
      color: 'red',
      ':hover': {
        padding: 10,
        '@media (min-width: 680px)': {
          padding: 3,
        },
      },
      '@media (min-width: 320px)': {
        color: 'blue',
      },
    })
  })
})
