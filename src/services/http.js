import { catchAsync } from "../utils"
import { UserAuth } from "./auth"

//https://dmitripavlutin.com/javascript-fetch-async-await/
//TODO: need to implement decorator? to add async handler
class httpServiceSingleton {
  constructor() {
    //hide away implementation details from the client components
    this.fetchLearners = httpServiceSingleton._fetchJsonFactory("learners")
    this.fetchProgrammes = httpServiceSingleton._fetchJsonFactory("programmes")
    this.postInstructorCredentials = httpServiceSingleton._fetchPostFactory(
      "instructor/login",
      true
    )
    this.postNewSchedule = httpServiceSingleton._fetchPostFactory(
      "programmes/schedules"
    )
    this.updateLearner = httpServiceSingleton._fetchPutFactory("learners/pbs")

    //make sure that only an instance is created
    this._instance = this
    if (httpServiceSingleton._instance) {
      return this._instance
    }
  }

  static BASE_URL = "http://localhost:5000"

  static _makeUrl(resourceUrl) {
    return `${this.BASE_URL}/${resourceUrl}`
  }

  //factory functions that makes use of closure
  static _fetchPostFactory(resourceUrl, returnJson = false) {
    const url = httpServiceSingleton._makeUrl(resourceUrl)
    return catchAsync(async function (payload) {
      const options = {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        Authorization: `Bearer ${UserAuth.getToken()}`,
        body: JSON.stringify(payload),
      }

      if (returnJson) {
        const response = await fetch(url, options)
        const json = await response.json()
        return [response.ok, json]
      }
      const { ok } = await fetch(url, options)
      return ok
    })
  }

  static _fetchPutFactory(resourceUrl) {
    const url = httpServiceSingleton._makeUrl(resourceUrl)
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
      const { ok } = await fetch(url, options)
      return ok
    })
  }

  static _fetchJsonFactory(resourceUrl) {
    const url = httpServiceSingleton._makeUrl(resourceUrl)
    return catchAsync(async function () {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${UserAuth.getToken()}`,
        },
      })
      return response.json()
    })
  }

  //FIXME: how to implement retry?
  static _retryFetch(asyncFetchFunc) {
    setInterval(async () => {
      console.log("Refetching ...")
      return catchAsync(asyncFetchFunc())
    }, 5000)
  }

  static getInstance() {
    return httpServiceSingleton._instance || new httpServiceSingleton()
  }
}

//only export an instance (singleton)
export default httpServiceSingleton.getInstance()
