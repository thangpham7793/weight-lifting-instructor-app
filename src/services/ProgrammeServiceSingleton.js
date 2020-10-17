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
    return await ProgrammeServiceSingleton._fetchJsonFactory("programmes")()
  }

  async createProgramme() {}
  async updateProgramme() {}

  //schedules
  async fetchSchedules() {
    return await ProgrammeServiceSingleton._fetchJsonFactory(
      "programmes/schedules"
    )()
  }

  async deleteSchedule(id) {
    return await ProgrammeServiceSingleton._fetchDeleteFactory(
      "programmes/schedules"
    )(id)
  }

  async postNewSchedule(payload) {
    return await ProgrammeServiceSingleton._fetchPostFactory(
      "programmes/schedules"
    )(payload)
  }

  async repostSchedule(payload) {
    return await ProgrammeServiceSingleton._fetchPutFactory(
      "programmes/schedules"
    )(payload)
  }

  async fetchScheduleInfo() {
    return await ProgrammeServiceSingleton._fetchJsonFactory(
      "programmes/schedules/info"
    )()
  }
  //schedule and programme
  async getAvailableProgrammesToPublish(scheduleId) {
    return await ProgrammeServiceSingleton._fetchJsonFactory(
      `programmes/schedules/${scheduleId}/publish/available.programmes`
    )()
  }

  //TODO: can use req.params as well no need to serialize
  async publishSchedule(scheduleId, programmeIds) {
    return await ProgrammeServiceSingleton._fetchPostFactory(
      `programmes/schedules/${scheduleId}/publish`
    )({ programmeIds })
  }

  async unpublishSchedule(scheduelId, programmeId) {
    console.log(scheduelId, programmeId)
    return { ok: true }
  }

  static getProgrammeInstance() {
    return (
      ProgrammeServiceSingleton._instance || new ProgrammeServiceSingleton()
    )
  }
}

export default ProgrammeServiceSingleton.getProgrammeInstance()
