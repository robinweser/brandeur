import { createHooks } from 'brandeur'
import prefixer, { fallbacks } from 'brandeur-plugin-prefixer'

const [_, css] = createHooks({
  hooks: {
    ':hover': ':hover',
  },
  plugins: [prefixer()],
  fallbacks,
})

export default css
