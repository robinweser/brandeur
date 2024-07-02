import test from 'ava'

import debug from '../index.js'

test('Debugging layouts should add debug styles', (t) => {
  const resolve = debug()

  t.snapshot(resolve({ color: 'red', fontSize: 12 }))
})

test('Debugging layouts should add debug styles only when debug=true is passed', (t) => {
  const resolve = debug(false)

  t.snapshot(resolve({ color: 'red', fontSize: 12 }))
  t.snapshot(resolve({ debug: true, color: 'red', fontSize: 12 }))
})

test('Debugging layouts should accept custom configuration', (t) => {
  const resolve = debug(true, { debugWith: 'background' })

  t.snapshot(resolve({ color: 'red', fontSize: 12 }))
})
