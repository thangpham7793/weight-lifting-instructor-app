import { HttpServiceSingleton } from "./http"
import { safeSpinnerWrapper } from "../utils"

class LearnerService extends HttpServiceSingleton {
  constructor() {
    super()
    this.updateLearner = safeSpinnerWrapper(this.updateLearner)
    this.deleteLearner = safeSpinnerWrapper(this.deleteLearner)
    this.createLearner = safeSpinnerWrapper(this.createLearner)
  }

  async fetchLearners() {
    console.log(`Fetching Learners`)
    const res = await LearnerService._fetchJsonFactory("learners")()
    return res ? res : false
  }

  async updateLearner(selectedLearner) {
    console.log(`Sending ${JSON.stringify(selectedLearner)}`)
    const res = await LearnerService._fetchPutFactory("learners/details")({
      learner: selectedLearner,
    })
    return res ? res : false
  }

  async deleteLearner(learnerId) {
    console.log("Delete learner id ", learnerId)
    const res = await LearnerService._fetchDeleteFactory("learners")(learnerId)
    return res ? res : false
  }

  async createLearner(learner) {
    console.log(`Sending new learner ${JSON.stringify(learner)}`)
    const res = await LearnerService._fetchPostFactory("learners")({
      learner: learner,
    })
    return res ? res : false
  }
}

export default new LearnerService()
