import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import { Logo, LoginForm, LoginFormTextInput } from "./register"
import { UserAuth, validateLearnerCredentials } from "../../services/register"
import httpService from "../../services/LearnerServiceSingleton"
import { init } from "../../reducers/learnerSchedulesSlice"
import { useDispatch } from "react-redux"
import { TextField, Grid } from "@material-ui/core"

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

  const fields = Object.keys(credentials).map((fieldName, index) => (
    <Grid
      item
      xs={10}
      md={6}
      lg={4}
      style={{ margin: "0 auto" }}
      key={fieldName}
    >
      <TextField
        style={{ marginBottom: "1rem" }}
        variant="outlined"
        label={fieldName}
        InputProps={{
          // value: credentials[fieldName],
          name: fieldName,
          type: fieldName === "password" ? "password" : "text",
        }}
        onChange={onInputChanged}
      />
    </Grid>
  ))

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
        fields={fields}
        errorMessage={errorMessage}
      />
    </div>
  )
}
