import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import { Logo, LoginForm, LearnerSignUpDialog } from "./register"
import {
  NavHelpers,
  UserAuth,
  validateLearnerCredentials,
  isNotEmpty,
  isValidEmail,
} from "../../services/register"
import httpService from "../../services/LearnerServiceSingleton"
import { initSchedules } from "../../reducers/learnerSchedulesSlice"
import { initPbs } from "../../reducers/learnerPbsSlice"
import { useDispatch } from "react-redux"

export function LearnerLoginPage({ onLearnerLogIn, isLearnerLoggedIn }) {
  NavHelpers.setCurrentPage("/learner/login")

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
      dispatch(initSchedules(payload.schedules))
      dispatch(initPbs(payload.pbs))
      onLearnerLogIn()
    }
  }

  const [openSignUpDialog, setSignUpDialogOpen] = useState(false)

  const newLearnerTemplate = {
    firstName: "",
    lastName: "",
    email: "",
  }

  const isInputValidTemplate = {
    firstName: false,
    lastName: false,
    email: false,
  }

  const [tempLearner, setTempLearner] = useState(newLearnerTemplate)
  const [isInputValid, setIsInputValid] = useState(isInputValidTemplate)

  function validateNewRecordAndUpdateState(e, setNewState) {
    const changedField = e.currentTarget.getAttribute("name")
    let newValue = e.currentTarget.value
    if (changedField === "firstName" || changedField === "lastName") {
      if (isNotEmpty(newValue)) {
        setIsInputValid((state) => {
          let newState = { ...state }
          newState[`${changedField}`] = true
          return newState
        })
      } else {
        setIsInputValid((state) => {
          let newState = { ...state }
          newState[`${changedField}`] = false
          return newState
        })
      }
    }

    if (changedField === "email") {
      if (isValidEmail(newValue)) {
        setIsInputValid((state) => {
          return { ...state, email: true }
        })
      } else {
        setIsInputValid((state) => {
          return { ...state, email: false }
        })
      }
    }

    setNewState((currentRecord) => {
      let newRecord = { ...currentRecord }
      newRecord[`${changedField}`] = newValue
      return newRecord
    })
  }

  function onSignUpBtnClicked(e) {
    e.preventDefault()
    console.log("Clicked!")
    setSignUpDialogOpen(true)
  }

  function onLearnerInputChange(e) {
    validateNewRecordAndUpdateState(e, setTempLearner)
  }

  function onSignUpDialogClosed() {
    setIsInputValid(isInputValidTemplate)
    setTempLearner(newLearnerTemplate)
    setSignUpDialogOpen(false)
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
        onSignUpBtnClicked={onSignUpBtnClicked}
      />
      <LearnerSignUpDialog
        open={openSignUpDialog}
        onSignUpDialogClosed={onSignUpDialogClosed}
        onLearnerInputChange={onLearnerInputChange}
        tempLearner={tempLearner}
        isInputValid={isInputValid}
      />
    </div>
  )
}
