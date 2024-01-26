import createTheme from '../createTheme'

describe('Creating themes', () => {
  it('should return a theme object and css variables', () => {
    const [theme, variables] = createTheme({
      colors: {
        grey100: 'grey',
        grey200: 'lightgrey',
        foreground: {
          primary: 'red',
        },
        background: {
          primary: 'blue',
        },
      },
      spacings: {
        small: 4,
        medium: 8,
        large: 16,
        huge: 32,
      },
      fonts: {
        body: 'Inter, sans-serif',
        heading: 'Roboto',
      },
    })

    expect(theme).toEqual({
      colors: {
        grey100: 'var(--colors-grey100)',
        grey200: 'var(--colors-grey200)',
        foreground: {
          primary: 'var(--colors-foreground-primary)',
        },
        background: {
          primary: 'var(--colors-background-primary)',
        },
      },
      spacings: {
        small: 'var(--spacings-small)',
        medium: 'var(--spacings-medium)',
        large: 'var(--spacings-large)',
        huge: 'var(--spacings-huge)',
      },
      fonts: {
        body: 'var(--fonts-body)',
        heading: 'var(--fonts-heading)',
      },
    })

    expect(variables).toEqual({
      '--colors-background-primary': 'blue',
      '--colors-foreground-primary': 'red',
      '--colors-grey100': 'grey',
      '--colors-grey200': 'lightgrey',
      '--fonts-body': 'Inter, sans-serif',
      '--fonts-heading': 'Roboto',
      '--spacings-huge': 32,
      '--spacings-large': 16,
      '--spacings-medium': 8,
      '--spacings-small': 4,
    })
  })

  it('should support a custom prefix', () => {
    const [theme, variables] = createTheme(
      {
        colors: {
          grey100: 'grey',
          grey200: 'lightgrey',
          foreground: {
            primary: 'red',
          },
        },
        fonts: {
          body: 'Inter, sans-serif',
        },
      },
      'theme'
    )

    expect(theme).toEqual({
      colors: {
        grey100: 'var(--theme-colors-grey100)',
        grey200: 'var(--theme-colors-grey200)',
        foreground: {
          primary: 'var(--theme-colors-foreground-primary)',
        },
      },

      fonts: {
        body: 'var(--theme-fonts-body)',
      },
    })

    expect(variables).toEqual({
      '--theme-colors-foreground-primary': 'red',
      '--theme-colors-grey100': 'grey',
      '--theme-colors-grey200': 'lightgrey',
      '--theme-fonts-body': 'Inter, sans-serif',
    })
  })
})
