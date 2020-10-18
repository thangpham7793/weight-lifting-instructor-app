class ScheduleReducers {
  static _updateScheduleDetails(
    { scheduleId, scheduleName, weekCount },
    prevSchedules
  ) {
    const newSchedules = [...prevSchedules]
    const targetIndex = newSchedules.findIndex(
      (s) => s.scheduleId === scheduleId
    )
    newSchedules[targetIndex] = {
      ...newSchedules[targetIndex],
      scheduleName,
      weekCount,
    }
    return newSchedules
  }

  static _addPublishedProgramme({ scheduleId, programmes }, prevSchedules) {
    const newSchedules = [...prevSchedules]
    //this returns a reference to the item in the array
    const updatedSchedule = newSchedules.find(
      (s) => s.scheduleId === scheduleId
    )

    updatedSchedule.programmes = [...updatedSchedule.programmes, ...programmes]
    return newSchedules
  }

  static _removeProgrammeFromSchedule(
    { scheduleId, targetProgramme },
    prevSchedules
  ) {
    let newSchedules = [...prevSchedules]
    let targetSchedule = newSchedules.find((s) => s.scheduleId === scheduleId)
    let removedProgrammeIndex = targetSchedule.programmes.findIndex(
      (p) => p.programmeId === targetProgramme.programmeId
    )
    targetSchedule.programmes.splice(removedProgrammeIndex, 1)
    return newSchedules
  }

  static _deleteOneScheduleById({ scheduleId }, prevSchedules) {
    return prevSchedules.filter((s) => s.scheduleId !== scheduleId)
  }

  static _addNewSchedule({ newScheduleInfoObject }, prevSchedules) {
    return [...prevSchedules, newScheduleInfoObject]
  }

  //command & factory pattern
  static factory(schedules, setSchedules) {
    return function (action, payload) {
      switch (action) {
        case "delete":
          setSchedules(
            ScheduleReducers._deleteOneScheduleById(payload, schedules)
          )
          return
        case "upload":
          setSchedules(ScheduleReducers._addNewSchedule(payload, schedules))
          return
        case "publish":
          setSchedules(
            ScheduleReducers._addPublishedProgramme(payload, schedules)
          )
          return
        case "unpublish":
          setSchedules(
            ScheduleReducers._removeProgrammeFromSchedule(payload, schedules)
          )
          return
        case "repost":
          setSchedules(
            ScheduleReducers._updateScheduleDetails(payload, schedules)
          )
          return
        default:
          return
      }
    }
  }
}

export default ScheduleReducers
