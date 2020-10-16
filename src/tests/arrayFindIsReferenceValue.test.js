test("Returned value of array find method is a reference so modifiying it will modify the wrapper array", () => {
  let arr = [{ id: 0, prop: 1 }]

  //find element
  let item = arr.find((e) => e.id === 0)
  //modify returned value
  item.prop = 2

  expect(item.prop === arr[0].prop).toBe(true)
})
