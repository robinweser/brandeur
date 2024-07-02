import test from 'ava'

import sortProperty from '../index.js'

test('Sorting properties should sort according to a proprity map', (t) => {
  const resolve = sortProperty({
    backgroundColor: 2,
  })

  t.snapshot(
    JSON.stringify(
      resolve({
        backgroundColor: 'blue',
        background: 'red',
      })
    )
  )
})
