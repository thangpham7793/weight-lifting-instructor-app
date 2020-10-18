import React from "react"
import { LearnerApp, InstructorApp } from "./register"

export function App({ currentApp, onAppChange }) {
  return currentApp === "/instructor" ? (
    <InstructorApp onAppChange={onAppChange} />
  ) : (
    <LearnerApp onAppChange={onAppChange} />
  )
}
