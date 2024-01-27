import enforceLonghandsPlugin from '../index'

describe('Using brandeur-plugin-enforce-longhands', () => {
  it('should enforce longhands', () => {
    const resolve = enforceLonghandsPlugin()

    expect(
      resolve({
        backgroundColor: 'blue',
        background: 'red',
      })
    ).toEqual({
      background: 'red',
      backgroundColor: 'blue',
    })
  })
  it('should adhere to the border mode', () => {
    const resolve = enforceLonghandsPlugin({ borderMode: 'directional' })

    expect(
      resolve({
        borderRight: '1px solid black',
        borderWidth: 4,
      })
    ).toEqual({
      borderWidth: 4,
      borderRight: '1px solid black',
    })
  })
})
