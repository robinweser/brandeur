import { createHooks } from '@css-hooks/react'

const [_, css] = createHooks(
  {
    ':hover': ':hover',
  },
  {
    sort: false,
  }
)

export default css
