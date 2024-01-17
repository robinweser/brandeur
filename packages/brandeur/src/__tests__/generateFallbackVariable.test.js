import generateFallbackVariable from '../generateFallbackVariable'

describe('Generating fallback variables', () => {
  it('should return valid CSS variables names', () => {
    expect(generateFallbackVariable('position', 'sticky')).toBe(
      '--position-sticky'
    )
  })
})
