function repMaxrange(length) {
  return Array(length)
    .fill()
    .map((element, index) => `x${index + 1}`)
}

test("The function should return an array of repMax from 1 to 10", () => {
  const repMaxArr = repMaxrange(10)
  expect(repMaxArr).toEqual([
    "x1",
    "x2",
    "x3",
    "x4",
    "x5",
    "x6",
    "x7",
    "x8",
    "x9",
    "x10",
  ])
})
