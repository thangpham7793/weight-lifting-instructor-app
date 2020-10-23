import React, { useState } from "react"
import { useSelector } from "react-redux"
import { selectLearnerSchedules } from "../../reducers/learnerSchedulesSlice"
import { ScheduleSelect } from "./register"
import { NavHelpers } from "../../services/register"
import { Redirect } from "react-router-dom"

export function LearnerSchedulePage() {
  NavHelpers.setCurrentPage("/learner/schedules")
  const schedules = useSelector(selectLearnerSchedules)
  const [selectedSchedule, setSelectedschedule] = useState(
    schedules ? schedules[0] : null
  )
  const [selectedWeek, setSelectedWeek] = useState(schedules ? 1 : null)
  const [isSchedulePicked, setIsSchedulePicked] = useState(false)

  function onScheduleChecked(e) {
    const checkedScheduleId = parseInt(e.target.value)
    console.log(checkedScheduleId)
    setSelectedschedule(
      schedules.find((s) => s.scheduleId === checkedScheduleId)
    )
  }

  function onWeekSelected(e) {
    console.log(e.target)
    setSelectedWeek(parseInt(e.target.value))
  }

  function onScheduleSubmitted(e) {
    setIsSchedulePicked(true)
  }

  return isSchedulePicked ? (
    <Redirect to={`/learner/${selectedSchedule.scheduleId}/${selectedWeek}`} />
  ) : (
    <ScheduleSelect
      selectedSchedule={selectedSchedule}
      schedules={schedules}
      onScheduleChecked={onScheduleChecked}
      onScheduleSubmitted={onScheduleSubmitted}
      selectedWeek={selectedWeek}
      onWeekSelected={onWeekSelected}
    />
  )
}
