import { HttpServiceSingleton } from "./http"
import { safeSpinnerWrapper } from "../utils"

export class InstructorServiceSingleton extends HttpServiceSingleton {
  constructor() {
    super()
    this.instructorLogin = safeSpinnerWrapper(this.instructorLogin)
    this._instance = this
    if (InstructorServiceSingleton._instance) {
      return this._instance
    }
  }

  static getInstructorInstance() {
    return (
      InstructorServiceSingleton._instance || new InstructorServiceSingleton()
    )
  }

  async instructorLogin(credentials) {
    const res = await InstructorServiceSingleton._fetchPostFactory(
      "instructor/login",
      true
    )(credentials)

    return res ? res : [false, {}]
  }
}

export default InstructorServiceSingleton.getInstructorInstance()
