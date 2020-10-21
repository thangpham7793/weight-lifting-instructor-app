import React from "react"
import { useParams } from "react-router-dom"

export function SingleExerciseForm() {
  const { exerciseName } = useParams()
  return <div>{exerciseName}</div>
}
