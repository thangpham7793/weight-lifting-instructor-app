function normalToCamelCase(normalStr) {
  return normalStr
    .split(" ")
    .map((word, index) => {
      //first letter is uppercased and returned
      if (index === 0) {
        return word.toLowerCase()
      } else {
        return word.substring(0, 1).toUpperCase() + word.substr(1)
      }
    })
    .join("")
}

test("normal case string should be converted to camelCase", () => {
  expect(normalToCamelCase("normal string")).toEqual("normalString")
  expect(normalToCamelCase("Normal String")).toEqual("normalString")
  expect(normalToCamelCase("normal String")).toEqual("normalString")
})
