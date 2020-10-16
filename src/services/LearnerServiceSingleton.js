import { HttpServiceSingleton } from "./http"
import { safeSpinnerWrapper } from "../utils"

export class LearnerServiceSingleton extends HttpServiceSingleton {
  constructor() {
    super()
    console.log("New LearnerServiceSingleton!")
    this.updateLearner = safeSpinnerWrapper(this.updateLearner)
    this.deleteLearner = safeSpinnerWrapper(this.deleteLearner)
    this.createLearner = safeSpinnerWrapper(this.createLearner)
    this._instance = this
    if (LearnerServiceSingleton._instance) {
      return this._instance
    }
  }

  async fetchLearners() {
    console.log(`Fetching Learners`)
    return await LearnerServiceSingleton._fetchJsonFactory("learners")()
  }

  async updateLearner(selectedLearner) {
    console.log(`Sending ${JSON.stringify(selectedLearner)}`)
    return await LearnerServiceSingleton._fetchPutFactory("learners/details")({
      learner: selectedLearner,
    })
  }

  async deleteLearner(learnerId) {
    console.log("Delete learner id ", learnerId)
    return await LearnerServiceSingleton._fetchDeleteFactory("learners")(
      learnerId
    )
  }

  async createLearner(learner) {
    console.log(`Sending new learner ${JSON.stringify(learner)}`)
    return await LearnerServiceSingleton._fetchPostFactory("learners")({
      learner: learner,
    })
  }

  static getLearnerInstance() {
    return LearnerServiceSingleton._instance || new LearnerServiceSingleton()
  }
}

export default LearnerServiceSingleton.getLearnerInstance()
