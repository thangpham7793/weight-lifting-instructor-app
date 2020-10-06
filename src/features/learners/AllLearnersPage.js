import React, { useEffect, useState } from "react"
import { PBTable } from "./register"

export function AllLearnersPage() {
  const [learners, setLearners] = useState([])

  useEffect(() => {
    async function fetchLearners() {
      const response = await fetch("http://localhost:5000/learners")
      const payload = await response.json()
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
