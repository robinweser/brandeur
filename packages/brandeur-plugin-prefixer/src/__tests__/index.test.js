import prefixerPlugin from '../index'

describe('Using brandeur-plugin-prefixer', () => {
  it('should add vendor prefixes where needed', () => {
    const resolve = prefixerPlugin()

    expect(
      resolve({
        color: 'red',
        appearance: 'none',
      })
    ).toEqual({
      color: 'red',
      WebkitAppearance: 'none',
      appearance: 'none',
    })
    expect(
      resolve({
        color: 'red',
        ':hover': {
          appearance: 'none',
        },
      })
    ).toEqual({
      color: 'red',
      ':hover': {
        WebkitAppearance: 'none',
        appearance: 'none',
      },
    })
  })
})
