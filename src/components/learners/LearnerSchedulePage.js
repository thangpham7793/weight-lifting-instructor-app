import React, { useState } from "react"
import { useSelector } from "react-redux"
import { selectLearnerSchedules } from "../../reducers/learnerSchedulesSlice"
import { ScheduleOptions } from "./register"
import { NavHelpers } from "../../services/register"
import { Grid } from "@material-ui/core"

export function LearnerSchedulePage() {
  NavHelpers.setCurrentPage("/learner/schedules")
  const schedules = useSelector(selectLearnerSchedules)
  const [selectedScheduleId, setSelectedscheduleId] = useState(
    schedules[0].scheduleId
  )

  function onScheduleChecked(e) {
    setSelectedscheduleId(parseInt(e.target.value))
  }

  return (
    <Grid item xs={8} md={6} lg={4}>
      <ScheduleOptions
        schedules={schedules}
        onScheduleChecked={onScheduleChecked}
        label="Available Cycles"
        selectedScheduleId={selectedScheduleId}
      />
    </Grid>
  )
}
