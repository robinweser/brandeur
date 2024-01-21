import sortProperties from '../index'

describe('Using brandeur-plugin-sort-properties', () => {
  it('should sort proerties according to a priority map', () => {
    const resolve = sortProperties({
      backgroundColor: 2,
    })

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
})
