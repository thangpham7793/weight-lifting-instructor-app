import React, { useEffect, useState } from "react"
import { PBTable } from "./register"
import httpService from "../../services/LearnerServiceSingleton"

export function AllLearnersPage() {
  const [learners, setLearners] = useState([])

  useEffect(() => {
    async function fetchLearners() {
      const { ok, payload } = await httpService.fetchLearners()
      if (ok) {
        setLearners(payload)
        return
      } else {
        console.log(`Failed to fetch learners`)
      }
    }
    fetchLearners()
  }, [])

  return (
    <div>
      <h2>Learners</h2>
      {learners.length === 0 ? (
        <div>Fetching ...</div>
      ) : (
        <PBTable payload={learners} />
      )}
    </div>
  )
}
