import React, { useEffect, useState } from "react"
import { PBTable } from "./register"
import fetchService from "../../services/http"

export function AllLearnersPage() {
  const [learners, setLearners] = useState([])

  useEffect(() => {
    async function fetchLearners() {
      const payload = await fetchService.fetchLearners()
      setLearners(payload)
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
