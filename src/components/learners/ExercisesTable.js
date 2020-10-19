import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { selectLearnerPbs } from "../../reducers/learnerPbsSlice"
import { useParams } from "react-router-dom"
import { useFetchSnackbar } from "../../hooks/useFetchSnackbar"
import { DayOptions, DailyExerciseTable } from "./register"
import httpService from "../../services/ProgrammeServiceSingleton"

export function ExercisesTable() {
  const { scheduleId, week } = useParams()
  const [exercises, setExercises] = useState(null)
  const [selectedDay, setSelectedDay] = useState("day 1")
  const [pbs, setPbs] = useState(useSelector(selectLearnerPbs))

  const { setIsFetchSuccess, FetchNotificationDiv } = useFetchSnackbar(
    "exercises"
  )

  useEffect(() => {
    async function fetchExercises(scheduleId, week) {
      const { ok, payload } = await httpService.fetchExercises(scheduleId, week)
      if (ok) {
        setIsFetchSuccess(true)
        setExercises(JSON.parse(payload))
      } else {
        setIsFetchSuccess(false)
      }
    }
    fetchExercises(scheduleId, week)
  }, [scheduleId, week, setIsFetchSuccess])

  function onDaySelected(e) {
    setSelectedDay(e.target.value)
  }

  return exercises ? (
    <div>
      <DayOptions
        exercises={exercises}
        onDaySelected={onDaySelected}
        selectedDay={selectedDay}
        label="Day"
      />
      <DailyExerciseTable dailyExercises={exercises[selectedDay]} pbs={pbs} />
    </div>
  ) : (
    <FetchNotificationDiv />
  )
}
