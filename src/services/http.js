import { catchAsync } from "../utils"
import { UserAuth } from "./auth"

//https://dmitripavlutin.com/javascript-fetch-async-await/
export class HttpServiceSingleton {
  //TODO: these methods can be refactored into their own service class as well
  constructor() {
    //hide away implementation details from the client components
    this.postInstructorCredentials = HttpServiceSingleton._fetchPostFactory(
      "instructor/login"
    )
    //make sure that only an instance is created
    this._instance = this
    if (HttpServiceSingleton._instance) {
      return this._instance
    }
  }

  static BASE_URL = (function () {
    const PROD = "https://lifting-schedule-v2.herokuapp.com"
    const DEV = "http://localhost:5000"

    return window.location.href.split(".").includes("herokuapp") ? PROD : DEV
  })()

  static _makeUrl(resourceUrl) {
    return `${this.BASE_URL}/${resourceUrl}`
  }

  //factory functions that makes use of closure
  static _fetchPostFactory(resourceUrl, timeout = 10) {
    const url = HttpServiceSingleton._makeUrl(resourceUrl)
    return catchAsync(async function (payload) {
      const options = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }

      if (UserAuth.isAuthenticated()) {
        options.headers.Authorization = `Bearer ${UserAuth.getToken()}`
      }

      HttpServiceSingleton._setFetchTimeout(timeout, options)
      return HttpServiceSingleton._makePayload(await fetch(url, options))
    })
  }

  static _fetchPutFactory(resourceUrl, timeout = 10) {
    const url = HttpServiceSingleton._makeUrl(resourceUrl)
    return catchAsync(async function (payload = null) {
      const options = {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${UserAuth.getToken()}`,
        },
      }

      if (payload) {
        options.body = JSON.stringify(payload)
      }

      HttpServiceSingleton._setFetchTimeout(timeout, options)

      return HttpServiceSingleton._makePayload(await fetch(url, options))
    })
  }

  static _fetchJsonFactory(resourceUrl, timeout = 10) {
    const url = HttpServiceSingleton._makeUrl(resourceUrl)
    return catchAsync(async function () {
      const options = {
        headers: {
          Authorization: `Bearer ${UserAuth.getToken()}`,
        },
      }

      HttpServiceSingleton._setFetchTimeout(timeout, options)

      return HttpServiceSingleton._makePayload(await fetch(url, options))
    })
  }

  static _fetchDeleteFactory(resourceUrlAndId, timeout = 10) {
    const url = HttpServiceSingleton._makeUrl(resourceUrlAndId)
    return catchAsync(async function () {
      const options = {
        method: "DELETE",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${UserAuth.getToken()}`,
        },
      }

      HttpServiceSingleton._setFetchTimeout(timeout, options)

      return HttpServiceSingleton._makePayload(await fetch(url, options))
    })
  }

  static _setFetchTimeout(timeout, options) {
    const ctl = new AbortController()
    setTimeout(() => ctl.abort(), timeout * 1000)
    options.signal = ctl.signal
  }

  static async _makePayload(response) {
    if (!response) {
      return { ok: false, payload: null }
    }

    const ok = response.ok

    //FIXME: may need to switch based on status code!
    switch (response.status) {
      case 204:
        console.log("No Content")
        return { ok, payload: null }
      default:
        break
    }
    const payload = await response.json()
    console.log({ ok, payload })
    return { ok, payload: payload ? payload : null }
  }

  //FIXME: how to implement retry?
  static _retryFetch(asyncFetchFunc) {
    setInterval(async () => {
      console.log("Refetching ...")
      return catchAsync(asyncFetchFunc())
    }, 5000)
  }

  static getInstance() {
    return HttpServiceSingleton._instance || new HttpServiceSingleton()
  }
}

//only export an instance (singleton)
export default HttpServiceSingleton.getInstance()
