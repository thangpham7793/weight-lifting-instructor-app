import React, { useState } from "react"
import { Redirect } from "react-router"
import { Logo, LoginForm, LoginFormTextInput } from "./register"
import { UserAuth, validateLearnerCredentials } from "../../services/register"

import httpService from "../../services/LearnerServiceSingleton"

export function LearnerHomePanel({ onLogIn, isLearnerLoggedIn }) {
  const [credentials, setCredentials] = useState({ username: "", password: "" })
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
    const error = validateLearnerCredentials(credentials)
    if (error) {
      setErrorMessage(error)
      return
    }
    setErrorMessage(null)
    console.log("Logging in with ", credentials)

    const { ok, payload } = await httpService.learnerLogin(credentials)

    if (!ok) {
      setErrorMessage(payload.message)
      return
    } else {
      UserAuth.saveToken(payload.token)
      onLogIn()
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
    <div>
      {isLearnerLoggedIn ? (
        <Redirect to="/learner/schedules" />
      ) : (
        <>
          <Logo />
          <LoginForm
            onFormSubmitted={onFormSubmitted}
            fields={fields}
            errorMessage={errorMessage}
          />
        </>
      )}
    </div>
  )
}
