test("Returned value of array find method is a reference so modifiying its prop will modify the wrapper array", () => {
  let arr = [{ id: 0, prop: 1 }]

  //find element
  let item = arr.find((e) => e.id === 0)
  //modify returned value
  item.prop = 2

  expect(item.prop === arr[0].prop).toBe(true)
})

test("modifiying by an item using index will modify the wrapper array", () => {
  let arr = [{ id: 0, prop: 1 }]

  let prop = 2

  //find element index
  let itemIndex = arr.findIndex((e) => e.id === 0)

  //modify the item using the index
  arr[itemIndex] = { ...arr[itemIndex], prop }

  expect(prop === arr[0].prop).toBe(true)
  expect(arr[0].prop).toBe(2)
})

test("modifying prop by spreading the returned value from array find method will not modify the wrapper array", () => {
  let arr = [{ id: 0, prop: 1 }]

  let prop = 2

  //find element index
  let item = arr.find((e) => e.id === 0)

  item = { ...item, prop }

  expect(item.prop === arr[0].prop).toBe(false)
  expect(prop === arr[0].prop).toBe(false)
  expect(arr[0].prop).toBe(1)
  expect(item.prop).toBe(2)
})
