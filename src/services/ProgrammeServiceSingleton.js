import { HttpServiceSingleton } from "./http"
import { safeSpinnerWrapper } from "../utils"

export class ProgrammeServiceSingleton extends HttpServiceSingleton {
  constructor() {
    super()
    console.log("I was created!")
    //this can probably be accomplished with a loop
    this.fetchProgrammes = safeSpinnerWrapper(this.fetchProgrammes)
    this.fetchSchedules = safeSpinnerWrapper(this.fetchSchedules)
    this.fetchScheduleInfo = safeSpinnerWrapper(this.fetchScheduleInfo)
    this.deleteSchedule = safeSpinnerWrapper(this.deleteSchedule)
    this.publishSchedule = safeSpinnerWrapper(this.publishSchedule)
    this.unpublishSchedule = safeSpinnerWrapper(this.unpublishSchedule)
    this.repostSchedule = safeSpinnerWrapper(this.repostSchedule)
    this.postNewSchedule = safeSpinnerWrapper(this.postNewSchedule)
    this.getAvailableProgrammesToPublish = safeSpinnerWrapper(
      this.getAvailableProgrammesToPublish
    )

    this._instance = this
    if (ProgrammeServiceSingleton._instance) {
      return this._instance
    }
  }

  //programmes
  async fetchProgrammes() {
    const res = await ProgrammeServiceSingleton._fetchJsonFactory(
      "programmes"
    )()
    return res ? res : false
  }

  async createProgramme() {}
  async updateProgramme() {}

  //schedules
  async fetchSchedules() {
    const res = await ProgrammeServiceSingleton._fetchJsonFactory(
      "programmes/schedules"
    )()
    return res ? res : false
  }

  async deleteSchedule(id) {
    const res = await ProgrammeServiceSingleton._fetchDeleteFactory(
      "programmes/schedules"
    )(id)
    return res ? res : false
  }

  async postNewSchedule(payload) {
    const res = await ProgrammeServiceSingleton._fetchPostFactory(
      "programmes/schedules"
    )(payload)
    return res ? res : false
  }

  async repostSchedule(payload) {
    const res = await ProgrammeServiceSingleton._fetchPutFactory(
      "programmes/schedules"
    )(payload)
    return res ? res : false
  }

  async fetchScheduleInfo() {
    const res = await ProgrammeServiceSingleton._fetchJsonFactory(
      "programmes/schedules/info"
    )()
    return res ? res : false
  }
  //schedule and programme
  async getAvailableProgrammesToPublish(scheduleId) {
    const res = await ProgrammeServiceSingleton._fetchJsonFactory(
      `programmes/schedules/${scheduleId}/publish/available.programmes`
    )()
    return res ? res : false
  }

  //TODO: can use req.params as well no need to serialize
  async publishSchedule(scheduleId, programmeIds) {
    const res = await ProgrammeServiceSingleton._fetchPostFactory(
      `programmes/schedules/${scheduleId}/publish`
    )(programmeIds)
    return res ? res : false
  }

  async unpublishSchedule(scheduelId, programmeId) {}

  static getProgrammeInstance() {
    return (
      ProgrammeServiceSingleton._instance || new ProgrammeServiceSingleton()
    )
  }
}

export default ProgrammeServiceSingleton.getProgrammeInstance()
