import fallbackValue from '../fallbackValue'

describe('Using the fallback utility', () => {
  it('should return a valid fallback object', () => {
    expect(fallbackValue('position', ['-webkit-sticky', 'sticky'])).toEqual({
      property: 'position',
      values: ['-webkit-sticky', 'sticky'],
      match: 'sticky',
    })
    expect(
      fallbackValue('position', ['-webkit-sticky', 'sticky'], 'sticky')
    ).toEqual({
      property: 'position',
      values: ['-webkit-sticky', 'sticky'],
      match: 'sticky',
    })
  })

  it('should accept multiple properties', () => {
    expect(
      fallbackValue(['width', 'height'], ['-webkit-min-content', 'min-content'])
    ).toEqual({
      property: ['width', 'height'],
      values: ['-webkit-min-content', 'min-content'],
      match: 'min-content',
    })
  })
})
