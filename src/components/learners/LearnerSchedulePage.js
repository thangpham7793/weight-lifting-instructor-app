import React, { useState } from "react"
import { NavHelpers } from "../../services/register"

export function LearnerSchedulePage() {
  NavHelpers.setCurrentPage("/learner/schedules")
  const [schedules, setSchedules] = useState(
    JSON.parse(sessionStorage.getItem("schedules"))
  )
  return <div>Schedules</div>
}
