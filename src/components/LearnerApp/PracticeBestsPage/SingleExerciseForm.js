import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  selectOnePracticeBest,
  setOnePracticeBest,
} from "../../../reducers/practiceBestsSlice"
import httpService from "../../../services/LearnerServiceSingleton"
import { useParams } from "react-router-dom"

export function SingleExerciseForm() {
  const { exerciseName } = useParams()
  const dispatch = useDispatch()
  const records = useSelector((state) =>
    selectOnePracticeBest(state, exerciseName)
  )

  useEffect(() => {
    async function fetchRecords(exerciseName) {
      if (!records) {
        const {
          ok,
          payload,
        } = await httpService.getPracticeBestsByExerciseName(exerciseName)
        if (ok) {
          dispatch(setOnePracticeBest({ exerciseName, payload }))
        }
      } else {
        return
      }
    }
    fetchRecords(exerciseName)
  }, [exerciseName, dispatch, records])

  return <div>{JSON.stringify(records)}</div>
}
