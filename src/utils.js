export function camelCaseToNormal(camelCaseStr) {
  return camelCaseStr.split("").reduce((str, char, index) => {
    //first letter is uppercased and returned
    if (index === 0) {
      return char.toUpperCase()
    }
    //if a letter is uppercase, add a space in front
    if (char === char.toUpperCase()) {
      return str + " " + char
    } else {
      return str + char
    }
  }, "")
}

//async error handler decorator
export function catchAsync(asyncFunc, errorHandler = null) {
  return async function (...args) {
    try {
      return await asyncFunc(...args)
    } catch (error) {
      errorHandler
        ? errorHandler(asyncFunc)
        : console.log(`Something went wrong: ${error}`)
    }
  }
}

export function shallowEqual(obj1, obj2) {
  return Object.keys(obj1).every((k) => {
    return obj2.hasOwnProperty(k) && obj2[k] === obj1[k]
  })
}
