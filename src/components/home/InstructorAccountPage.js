import React from "react"
import { LoginFormButton } from "./register"

export function InstructorAccountPage({ onLogOutClicked }) {
  return (
    <>
      <h1>Welcome to the Instructor Space</h1>
      <LoginFormButton
        customClassName="logout"
        label="Log Out"
        onClick={onLogOutClicked}
      />
    </>
  )
}
