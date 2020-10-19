import React, { useState } from "react"
import { Logo, LoginForm, LoginFormTextInput } from "./register"
import {
  UserAuth,
  validateInstructorCredentials,
} from "../../services/register"
import httpService from "../../services/InstructorServiceSingleton"

export function InstructorLoginPage({ onInstructorLogIn }) {
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

  const fields = Object.keys(credentials).map((fieldName) => (
    <LoginFormTextInput
      key={fieldName}
      label={fieldName}
      onInputChanged={onInputChanged}
      value={credentials[fieldName]}
    />
  ))

  return (
    <>
      <Logo />
      <LoginForm
        title="Instructor Login"
        onFormSubmitted={onFormSubmitted}
        fields={fields}
        errorMessage={errorMessage}
      />
    </>
  )
}
