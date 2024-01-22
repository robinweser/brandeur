import getFallbackVariable from '../getFallbackVariable'

describe('Generating fallback variables', () => {
  it('should return valid CSS variables names', () => {
    expect(getFallbackVariable('position', 'sticky')).toBe('--position-sticky')
  })
})
