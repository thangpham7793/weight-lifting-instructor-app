class ScheduleReducers {
  static updateScheduleDetails(
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

  static addPublishedProgramme({ scheduleId, programmes }, prevSchedules) {
    const newSchedules = [...prevSchedules]
    //this returns a reference to the item in the array
    const updatedSchedule = newSchedules.find(
      (s) => s.scheduleId === scheduleId
    )

    updatedSchedule.programmes = [...updatedSchedule.programmes, ...programmes]
    return newSchedules
  }

  static removeProgrammeFromSchedule(
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

  static deleteOneScheduleById({ scheduleId }, prevSchedules) {
    return prevSchedules.filter((s) => s.scheduleId !== scheduleId)
  }

  static addNewSchedule({ newScheduleInfoObject }, prevSchedules) {
    return [...prevSchedules, newScheduleInfoObject]
  }
}

export default ScheduleReducers
