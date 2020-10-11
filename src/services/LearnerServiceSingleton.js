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
    const res = await LearnerServiceSingleton._fetchJsonFactory("learners")()
    return res ? res : false
  }

  async updateLearner(selectedLearner) {
    console.log(`Sending ${JSON.stringify(selectedLearner)}`)
    const res = await LearnerServiceSingleton._fetchPutFactory(
      "learners/details"
    )({
      learner: selectedLearner,
    })
    return res ? res : false
  }

  async deleteLearner(learnerId) {
    console.log("Delete learner id ", learnerId)
    const res = await LearnerServiceSingleton._fetchDeleteFactory("learners")(
      learnerId
    )
    return res ? res : false
  }

  async createLearner(learner) {
    console.log(`Sending new learner ${JSON.stringify(learner)}`)
    const res = await LearnerServiceSingleton._fetchPostFactory("learners")({
      learner: learner,
    })
    return res ? res : false
  }

  static getLearnerInstance() {
    return LearnerServiceSingleton._instance || new LearnerServiceSingleton()
  }
}

export default LearnerServiceSingleton.getLearnerInstance()
