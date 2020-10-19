import React, { useState } from "react"
import { NavHelpers } from "../../services/register"

export function LearnerSchedulePage() {
  NavHelpers.setCurrentPage("/learner/schedules")
  const [schedules, setSchedules] = useState([])

  return <div>Schedules</div>
}
