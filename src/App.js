import React from "react"
import { LearnerApp, InstructorApp } from "./register"

export function App({ currentPage, onAppChange }) {
  return currentPage.includes("/instructor") ? (
    <InstructorApp onAppChange={onAppChange} />
  ) : (
    <LearnerApp onAppChange={onAppChange} />
  )
}
