//https://dmitripavlutin.com/javascript-fetch-async-await/
//TODO: need to implement decorator? to add async handler
class httpServiceSingleton {
  constructor() {
    //hide away implementation details from the client components
    this.fetchLearners = httpServiceSingleton._fetchJsonFactory("learners")
    this.fetchProgrammes = httpServiceSingleton._fetchJsonFactory("programmes")
    this.postNewSchedule = httpServiceSingleton._fetchPostFactory(
      "programmes/schedules"
    )

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
  static _fetchPostFactory(resourceUrl) {
    const url = httpServiceSingleton._makeUrl(resourceUrl)
    return async function (payload) {
      const options = {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
      const { ok } = await fetch(url, options)
      return ok
    }
  }

  static _fetchJsonFactory(resourceUrl) {
    const url = httpServiceSingleton._makeUrl(resourceUrl)
    return async function () {
      const response = await fetch(url)
      return response.json()
    }
  }

  static getInstance() {
    return httpServiceSingleton._instance || new httpServiceSingleton()
  }
}

//only export an instance (singleton)
export default httpServiceSingleton.getInstance()
