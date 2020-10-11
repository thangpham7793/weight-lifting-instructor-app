import { HttpServiceSingleton } from "./http"
import { safeSpinnerWrapper } from "../utils"

export class ProgrammeServiceSingleton extends HttpServiceSingleton {
  constructor() {
    super()
    console.log("I was created!")
    this.fetchProgrammes = safeSpinnerWrapper(this.fetchProgrammes)
    this._instance = this
    if (ProgrammeServiceSingleton._instance) {
      return this._instance
    }
  }

  async fetchProgrammes() {
    const res = await ProgrammeServiceSingleton._fetchJsonFactory(
      "programmes"
    )()
    return res ? res : false
  }

  static getProgrammeInstance() {
    return (
      ProgrammeServiceSingleton._instance || new ProgrammeServiceSingleton()
    )
  }
}

export default ProgrammeServiceSingleton.getProgrammeInstance()
