import React, { useState } from "react"
import { Redirect } from "react-router"
import { Logo, LoginForm, LoginFormTextInput } from "./register"
import { UserAuth, validateCredentials } from "../../services/register"

import httpService from "../../services/InstructorServiceSingleton"

export function InstructorHomePanel({
  onInstructorLogIn,
  isInstructorLoggedIn,
}) {
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
    const error = validateCredentials(credentials)
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

  // function onLogOutClicked(e) {
  //   console.log("log me out!")
  //   UserAuth.clearToken()
  //   setisInstructorLoggedIn(false)
  // }

  return (
    <div>
      {isInstructorLoggedIn ? (
        <Redirect to="/instructor/schedules" />
      ) : (
        // <WelcomePanel onLogOutClicked={onLogOutClicked} />
        <>
          <Logo />
          <LoginForm
            title="Instructor Login"
            onFormSubmitted={onFormSubmitted}
            fields={fields}
            errorMessage={errorMessage}
          />
        </>
      )}
    </div>
  )
}
