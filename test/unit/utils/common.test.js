import test from 'ava'
import sinon from 'sinon'
import * as common from '../../../src/utils/common'

test('typeCheck', (t) => {
  t.throws(() => common.typeCheck(1, 'string'), TypeError)
  t.notThrows(() => common.typeCheck(1, 'number'), TypeError)
  t.throws(() => common.typeCheck('test', 'number'), TypeError)
  t.notThrows(() => common.typeCheck('test', 'string'), TypeError)
  t.throws(() => common.typeCheck('test', ['number', 'object']), TypeError)
  t.notThrows(() => common.typeCheck('test', ['number', 'string']), TypeError)
  t.false(common.typeCheck(1, 'string', { throw: false }))
  t.true(common.typeCheck(1, 'number', { throw: false }))
  t.false(common.typeCheck('test', 'number', { throw: false }))
  t.true(common.typeCheck('test', 'string', { throw: false }))
  t.false(common.typeCheck('test', ['number', 'object'], { throw: false }))
  t.true(common.typeCheck('test', ['number', 'string'], { throw: false }))
  t.throws(() => common.typeCheck(1), Error)
})

test('getType', (t) => {
  t.is(common.getType('hello'), 'string')
  t.is(common.getType(1), 'number')
  t.is(common.getType({}), 'object')
  t.is(common.getType([]), 'array')
  t.is(common.getType(() => {}), 'function')
  t.is(common.getType(function () {}), 'function')
})

test('deepGet', (t) => {
  const shallowObj = { a: 'hi' }
  const deepObj = { a: { b: { c: 'hi' } } }
  t.is(common.deepGet(shallowObj, 'a'), 'hi')
  t.is(common.deepGet(deepObj, 'a.b.c'), 'hi')
  t.falsy(common.deepGet())
  t.falsy(common.deepGet(deepObj, 'a.b.d'))
  t.throws(() => common.deepGet('hi'), TypeError)
  t.throws(() => common.deepGet(shallowObj, 1), TypeError)
})

test('debounce', (t) => {
  const clock = sinon.useFakeTimers()
  const spy = sinon.spy()
  const bounce = common.debounce(spy, { wait: 100 })
  bounce()
  bounce()
  clock.tick(90)
  bounce()
  clock.tick(99)
  bounce()
  clock.tick(100)
  t.is(spy.callCount, 1)
  clock.restore()
  t.throws(() => common.debounce('hi'))
})

test('getFreePort', async (t) => {
  t.is(typeof await common.getFreePort(), 'number')
  t.true(await common.getFreePort() > 0)
})
