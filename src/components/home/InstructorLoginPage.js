import React, { useState } from "react"
import { Logo, LoginForm } from "./register"
import {
  UserAuth,
  validateInstructorCredentials,
  NavHelpers,
} from "../../services/register"
import httpService from "../../services/InstructorServiceSingleton"

export function InstructorLoginPage({ onInstructorLogIn }) {
  NavHelpers.setCurrentPage("/instructor/login")

  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [errorMessage, setErrorMessage] = useState(null)

  function onInputChanged(e) {
    const changedField = e.target.getAttribute("name")
    const newValue = e.target.value.trim()
    setCredentials((c) => {
      c[changedField] = newValue
      return c
    })
  }

  async function onFormSubmitted(e) {
    e.preventDefault()
    const error = validateInstructorCredentials(credentials)
    if (error) {
      setErrorMessage(error)
      return
    }
    setErrorMessage(null)
    console.log("Logging in with ", credentials)

    const { ok, payload } = await httpService.instructorLogin(credentials)

    if (!ok) {
      setErrorMessage(payload.message)
      return
    } else {
      UserAuth.saveToken(payload.token)
      onInstructorLogIn()
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        minHeight: "100%",
        margin: "0 auto",
      }}
    >
      <Logo />
      <LoginForm
        title="Instructor Login"
        onFormSubmitted={onFormSubmitted}
        credentials={credentials}
        onInputChanged={onInputChanged}
        errorMessage={errorMessage}
        type="instructor"
      />
    </div>
  )
}
