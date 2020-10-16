import { catchAsync } from "../utils"
import { UserAuth } from "./auth"

//https://dmitripavlutin.com/javascript-fetch-async-await/
export class HttpServiceSingleton {
  //TODO: these methods can be refactored into their own service class as well
  constructor() {
    //hide away implementation details from the client components
    this.fetchProgrammes = HttpServiceSingleton._fetchJsonFactory("programmes")
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
  static _fetchPostFactory(resourceUrl) {
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

      return HttpServiceSingleton._makePayload(await fetch(url, options))
    })
  }

  static _fetchPutFactory(resourceUrl) {
    const url = HttpServiceSingleton._makeUrl(resourceUrl)
    return catchAsync(async function (payload) {
      const options = {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${UserAuth.getToken()}`,
        },
        body: JSON.stringify(payload),
      }
      return HttpServiceSingleton._makePayload(await fetch(url, options))
    })
  }

  static _fetchJsonFactory(resourceUrl) {
    const url = HttpServiceSingleton._makeUrl(resourceUrl)
    return catchAsync(async function () {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${UserAuth.getToken()}`,
        },
      })
      return HttpServiceSingleton._makePayload(response)
    })
  }

  static _fetchDeleteFactory(resourceUrl) {
    const url = HttpServiceSingleton._makeUrl(resourceUrl)
    return catchAsync(async function (resourceId) {
      const options = {
        method: "DELETE",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${UserAuth.getToken()}`,
        },
      }
      const response = await fetch(`${url}/${resourceId}`, options)
      return HttpServiceSingleton._makePayload(response)
    })
  }

  static async _makePayload(response) {
    const ok = response.ok
    //FIXME: may need to switch based on status code!
    switch (response.status) {
      case 204:
        return { ok: true, payload: null }
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
