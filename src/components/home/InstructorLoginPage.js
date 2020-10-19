import React, { useState } from "react"
import { Logo, LoginForm, LoginFormTextInput } from "./register"
import {
  UserAuth,
  validateInstructorCredentials,
} from "../../services/register"
import httpService from "../../services/InstructorServiceSingleton"
import { TextField, Grid } from "@material-ui/core"

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        minHeight: "100%",
        margin: "0 auto",
      }}
    >
      s
      <Logo />
      <LoginForm
        title="Instructor Login"
        onFormSubmitted={onFormSubmitted}
        fields={fields}
        errorMessage={errorMessage}
        type="instructor"
      />
    </div>
  )
}
