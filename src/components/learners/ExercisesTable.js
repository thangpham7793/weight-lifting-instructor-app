import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import httpService from "../../services/ProgrammeServiceSingleton"
import { useFetchSnackbar } from "../../hooks/useFetchSnackbar"

export function ExercisesTable() {
  const { scheduleId, week } = useParams()
  const [exercises, setExercises] = useState(null)

  const { setIsFetchSuccess, FetchNotificationDiv } = useFetchSnackbar(
    "exercises"
  )

  useEffect(() => {
    async function fetchExercises(scheduleId, week) {
      const { ok, payload } = await httpService.fetchExercises(scheduleId, week)

      if (ok) {
        console.log(payload)
        setIsFetchSuccess(true)
        setExercises(payload)
      } else {
        setIsFetchSuccess(false)
      }
    }
    fetchExercises(scheduleId, week)
  }, [scheduleId, week, setIsFetchSuccess])

  return <FetchNotificationDiv />
}
