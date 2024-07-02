import test from 'ava'

import responsiveValue from '../index.js'

test('Resolving responsive values should resolve media queries', (t) => {
  const resolve = responsiveValue([
    '@media (min-width: 320px)',
    '@media (min-width: 680px)',
  ])

  t.deepEqual(
    resolve({
      color: ['red', 'blue'],
      fontSize: 16,
      padding: [10, , 3],
    }),
    {
      color: 'red',
      fontSize: 16,
      padding: 10,
      '@media (min-width: 320px)': {
        color: 'blue',
      },
      '@media (min-width: 680px)': {
        padding: 3,
      },
    }
  )

  t.deepEqual(
    resolve({
      color: ['red', 'green', 'blue'],
      padding: [10, , 3],
    }),
    {
      color: 'red',
      padding: 10,
      '@media (min-width: 320px)': {
        color: 'green',
      },
      '@media (min-width: 680px)': {
        color: 'blue',
        padding: 3,
      },
    }
  )

  t.deepEqual(
    resolve({
      color: ['red', 'blue'],
      ':hover': {
        padding: [10, , 3],
      },
    }),
    {
      color: 'red',
      ':hover': {
        padding: 10,
        '@media (min-width: 680px)': {
          padding: 3,
        },
      },
      '@media (min-width: 320px)': {
        color: 'blue',
      },
    }
  )
})
