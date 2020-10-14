import React, { useState } from "react"

import { Logo, WelcomePanel, LoginForm, LoginFormTextInput } from "./register"
import { UserAuth, validateCredentials } from "../../services/register"

import httpService from "../../services/InstructorServiceSingleton"

export function HomePanel() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(UserAuth.isAuthenticated())

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
    const error = validateCredentials(credentials)
    if (error) {
      setErrorMessage(error)
      return
    }
    setErrorMessage(null)
    console.log("Logging in with ", credentials)

    const [oke, payload] = await httpService.instructorLogin(credentials)

    if (!oke) {
      setErrorMessage(payload.message)
    } else {
      UserAuth.saveToken(payload.token)
      setIsLoggedIn(true)
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

  function onLogOutClicked(e) {
    console.log("log me out!")
    UserAuth.clearToken()
    setIsLoggedIn(false)
  }

  return (
    <div>
      <Logo />
      {isLoggedIn ? (
        // <Redirect to="/instructor/schedules" />
        <WelcomePanel onLogOutClicked={onLogOutClicked} />
      ) : (
        <LoginForm
          onFormSubmitted={onFormSubmitted}
          fields={fields}
          errorMessage={errorMessage}
        />
      )}
    </div>
  )
}
