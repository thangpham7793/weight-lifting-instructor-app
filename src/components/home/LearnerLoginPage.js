import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import { Logo, LoginForm } from "./register"
import { UserAuth, validateLearnerCredentials } from "../../services/register"
import httpService from "../../services/LearnerServiceSingleton"
import { init } from "../../reducers/learnerSchedulesSlice"
import { useDispatch } from "react-redux"

export function LearnerLoginPage({ onLearnerLogIn, isLearnerLoggedIn }) {
  const dispatch = useDispatch()

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
      delete payload.token
      //redux?
      //hard-code for now
      dispatch(init(payload.schedules))
      onLearnerLogIn()
    }
  }

  return isLearnerLoggedIn ? (
    <Redirect to="learner/schedules" />
  ) : (
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
        title="Learner Login"
        onFormSubmitted={onFormSubmitted}
        credentials={credentials}
        onInputChanged={onInputChanged}
        errorMessage={errorMessage}
      />
    </div>
  )
}
