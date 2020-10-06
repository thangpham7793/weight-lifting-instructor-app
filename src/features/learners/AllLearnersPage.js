import React, { useEffect, useState } from "react"
import { PBTable } from "./register"

const payload = [
  {
    learnerId: 1,
    firstName: "Tom",
    lastName: "Tony",
    snatch: 100,
    clean: 100,
    jerk: 100,
    cleanAndJerk: 100,
    backSquat: 100,
    frontSquat: 100,
    pushPress: 100,
  },
  {
    learnerId: 2,
    firstName: "Tom",
    lastName: "Tony",
    snatch: 100,
    clean: 100,
    jerk: 100,
    cleanAndJerk: 100,
    backSquat: 100,
    frontSquat: 100,
    pushPress: 100,
  },
]

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
