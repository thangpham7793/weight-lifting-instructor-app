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

      if (error.toString().search(/AbortError/) !== -1) {
        return { ok: false, payload: { message: `Server timeouts!` } }
      } else if (error.toString().search(/NetworkError/) !== -1) {
        return { ok: false, payload: { message: `Can't connect to Server!` } }
      } else {
        return { ok: false, payload: null }
      }
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
      document.querySelector("#spinner").style.display = "block"
    } else {
      document.querySelector("#spinner").style.display = "none"
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

export function capitalise(string) {
  return string.substring(0, 1).toUpperCase() + string.substring(1)
}

//starting from 1!
export function range(length, gap = 1) {
  return Array(length)
    .fill()
    .map((element, index) => index + gap)
}
