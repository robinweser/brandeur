import test from 'ava'

import prefixer from '../index.js'

test('Prefixing styles should add vendor prefixes where needed', (t) => {
  const resolve = prefixer()

  t.deepEqual(
    resolve({
      color: 'red',
      appearance: 'none',
    }),
    {
      color: 'red',
      WebkitAppearance: 'none',
      appearance: 'none',
    }
  )

  t.deepEqual(
    resolve({
      color: 'red',
      ':hover': {
        appearance: 'none',
      },
    }),
    {
      color: 'red',
      ':hover': {
        WebkitAppearance: 'none',
        appearance: 'none',
      },
    }
  )
})
