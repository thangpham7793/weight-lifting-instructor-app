import React, { useEffect } from "react"
import { PBTable } from "./register"
import { useDispatch, useSelector } from "react-redux"
import {
  initAllLearners,
  selectAllLearners,
} from "../../reducers/allLearnersReducerSlice"
import httpService from "../../services/LearnerServiceSingleton"
import { NavHelpers } from "../../services/register"

export function LearnerOverview() {
  NavHelpers.setCurrentPage("/instructor/overview")
  const dispatch = useDispatch()
  const learners = useSelector(selectAllLearners)

  useEffect(() => {
    async function fetchLearners() {
      const { ok, payload } = await httpService.fetchLearners()
      if (ok) {
        dispatch(initAllLearners(payload))
        return
      } else {
        console.log(`Failed to fetch learners`)
      }
    }
    if (!learners) fetchLearners()
    return
  }, [learners, dispatch])

  console.log(learners && learners.length)

  return (
    <div>
      <h2>Learners</h2>
      {learners && (
        <PBTable
          payload={learners.map((l) => {
            const copy = { ...l }
            delete copy.username
            delete copy.email
            copy.firstName = `${copy.firstName} ${copy.lastName}`
            delete copy.firstName
            return copy
          })}
        />
      )}
    </div>
  )
}
