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
      errorHandler?.(error) ?? console.log(`Something went wrong: ${error}`)
    }
  }
}

export function shallowEqual(obj1, obj2) {
  return Object.entries(obj1).every(([obj1Key, obj1Value]) => {
    return obj2.hasOwnProperty(obj1Key) && obj1Value === obj2[obj1Key]
  })
}

export const spinner = (function () {
  function show(status) {
    if (status === true) {
      console.log("Show spinner now!")
      document.querySelector("#spinner").style.display = "block"
    } else {
      document.querySelector("#spinner").style.display = "none"
      console.log("Hide spinner")
    }
  }
  return { show }
})()

export function safeSpinnerWrapper(func) {
  return async function (...args) {
    spinner.show(true)
    const res = await catchAsync(func)(...args)
    spinner.show(false)
    return res
  }
}
