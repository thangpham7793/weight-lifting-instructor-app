import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import { Logo, LoginForm, LearnerSignUpDialog } from "./register"
import {
  NavHelpers,
  UserAuth,
  validateLearnerCredentials,
  isNotEmpty,
  isValidEmail,
} from "../../services/register"
import learnerHttpService from "../../services/LearnerServiceSingleton"
import programmeHttpService from "../../services/ProgrammeServiceSingleton"
import { initSchedules } from "../../reducers/learnerSchedulesSlice"
import { initPbs } from "../../reducers/learnerPbsSlice"
import { useDispatch } from "react-redux"
import { useActionSnackbar } from "../../hooks/useActionSnackbar"

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

  async function logUserIn(credentials) {
    const error = validateLearnerCredentials(credentials)
    if (error) {
      setErrorMessage(error)
      return
    }
    setErrorMessage(null)
    console.log("Logging in with ", credentials)

    const { ok, payload } = await learnerHttpService.learnerLogin(credentials)

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

  async function onFormSubmitted(e) {
    e.preventDefault()
    logUserIn(credentials)
  }

  const [programmes, setProgrammes] = useState(getProgrammes())
  const [openSignUpDialog, setSignUpDialogOpen] = useState(false)

  useEffect(() => {
    async function fetchProgrammes() {
      if (!programmes && openSignUpDialog) {
        const { ok, payload } = await programmeHttpService.fetchProgrammes()
        if (ok) {
          setProgrammes(payload.programmes)
          saveProgrammes(payload.programmes)
        }
      }
    }
    fetchProgrammes()
  }, [openSignUpDialog, programmes])

  const newLearnerTemplate = {
    firstName: "",
    lastName: "",
    email: "",
    programmeId: programmes ? programmes[0].programmeId : "",
  }

  const isInputValidTemplate = {
    firstName: null,
    lastName: null,
    email: null,
    programmeId: true,
  }

  const [tempLearner, setTempLearner] = useState(newLearnerTemplate)
  const [isInputValid, setIsInputValid] = useState(isInputValidTemplate)

  function validateNewRecordAndUpdateState(e, setNewState) {
    //select uses e.target rather than e.currentTarget
    const changedField = e.currentTarget.getAttribute("name")
      ? e.currentTarget.getAttribute("name")
      : e.target.name
    let newValue = e.currentTarget.value
      ? e.currentTarget.value
      : e.target.value
    console.log(changedField, newValue)
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
      if (isValidEmail(newValue) && isNotEmpty(newValue)) {
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
      if (changedField !== "programmeId") {
        newRecord[`${changedField}`] = newValue.trim().toLowerCase()
      } else {
        newRecord[`${changedField}`] = parseInt(newValue)
      }
      return newRecord
    })
  }

  function getProgrammes() {
    return sessionStorage.getItem("programmes")
      ? JSON.parse(sessionStorage.getItem("programmes"))
      : null
  }

  function saveProgrammes(programmes) {
    sessionStorage.setItem("programmes", JSON.stringify(programmes))
  }

  function onSignUpBtnClicked(e) {
    e.preventDefault()
    setSignUpDialogOpen(true)
  }

  function onLearnerInputChanged(e) {
    validateNewRecordAndUpdateState(e, setTempLearner)
  }

  const { SignUpSnackbar, callDecoratedSignUpService } = useActionSnackbar(
    "sign up",
    learnerHttpService.learnerSignup
  )

  function resetSignUpForm() {
    setIsInputValid(isInputValidTemplate)
    setTempLearner(newLearnerTemplate)
    setSignUpDialogOpen(false)
  }

  async function onSignUpDialogClosed(e) {
    const clickedBtn = e.currentTarget.getAttribute("name")

    switch (clickedBtn) {
      case "Close":
        return resetSignUpForm()
      default:
        const { ok, payload } = await callDecoratedSignUpService(tempLearner)
        if (ok) {
          resetSignUpForm()
          const { username } = payload
          if (
            window.confirm(
              `Your new username and password are "${username}" and "password. Would you like to sign in?`
            )
          ) {
            return await logUserIn({
              username,
              password: "password",
            })
          }
        }
    }
    return resetSignUpForm()
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
      {programmes && (
        <LearnerSignUpDialog
          open={openSignUpDialog}
          onSignUpDialogClosed={onSignUpDialogClosed}
          onLearnerInputChanged={onLearnerInputChanged}
          tempLearner={tempLearner}
          isInputValid={isInputValid}
          programmes={programmes}
        />
      )}
      <SignUpSnackbar />
    </div>
  )
}
