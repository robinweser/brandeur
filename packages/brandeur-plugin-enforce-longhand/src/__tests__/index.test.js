import test from 'ava'

import enforceLonghand from '../index.js'

test('Enforcing longhands should sort rules', (t) => {
  const resolve = enforceLonghand()

  t.snapshot(
    JSON.stringify(
      resolve({
        backgroundColor: 'blue',
        background: 'red',
      })
    )
  )
})

test('Enforcing longhands should adhere to the border mode', (t) => {
  const resolve = enforceLonghand({ borderMode: 'directional' })

  t.snapshot(
    JSON.stringify(
      resolve({
        borderRight: '1px solid black',
        borderWidth: 4,
      })
    )
  )
})
