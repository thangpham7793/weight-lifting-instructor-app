function shallowEqual(obj1, obj2) {
  return Object.entries(obj1).every(([obj1Key, obj1Value]) => {
    return obj2.hasOwnProperty(obj1Key) && obj1Value === obj2[obj1Key]
  })
}

test("two objects are equal", () => {
  const o1 = { a: 1, b: 2 }
  const o2 = { a: 1, b: 2 }

  const res = shallowEqual(o1, o2)

  expect(res).toBe(true)
})

test("two objects with different keys are not equal", () => {
  const o1 = { a: 1, c: 2 }
  const o2 = { a: 1, b: 2 }

  const res = shallowEqual(o1, o2)

  expect(res).toBe(false)
})

test("two objects with same keys but different values are not equal", () => {
  const o1 = { a: 1, b: 1 }
  const o2 = { a: 1, b: 2 }

  const res = shallowEqual(o1, o2)

  expect(res).toBe(false)
})

test("two objects with different number of keys are not equal", () => {
  const o1 = { a: 1, b: 1, c: 3 }
  const o2 = { a: 1, b: 2 }

  const res = shallowEqual(o1, o2)

  expect(res).toBe(false)
})
