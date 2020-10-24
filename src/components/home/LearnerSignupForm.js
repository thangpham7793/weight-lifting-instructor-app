import React from "react"
import { camelCaseToNormal } from "../../utils"
import { TextField, Grid, Typography } from "@material-ui/core"
import { ProgrammeOptions } from "./register"

function NewLearnerInput({ label, ...props }) {
  return (
    <Grid item align="left">
      <TextField
        label={camelCaseToNormal(label)}
        className="text-input"
        {...props}
        InputProps={{
          required: true,
        }}
      />
    </Grid>
  )
}

//for learnerApp
export function LearnerSignUpForm({
  tempLearner,
  onLearnerInputChanged,
  buttons,
  isInputValid,
  programmes,
}) {
  function pickHelperText(fieldName, isValid) {
    if (!isValid) {
      switch (fieldName) {
        case "firstName":
        case "lastName":
          return "Must not be empty"
        case "email":
          return "Must have a valid email format"
        default:
          break
      }
    }
    return null
  }

  //it does changes, but doesn't show on the UI
  const inputs = Object.keys(tempLearner).map((fieldName) => {
    if (fieldName === "programmeId") return null
    return (
      <NewLearnerInput
        label={fieldName}
        name={fieldName}
        type="text"
        key={fieldName}
        value={tempLearner[fieldName]}
        onChange={onLearnerInputChanged}
        error={isInputValid[`${fieldName}`] === false}
        helperText={
          isInputValid[`${fieldName}`] === false &&
          pickHelperText(fieldName, isInputValid[`${fieldName}`])
        }
        style={{ minWidth: "100%" }}
      />
    )
  })

  function FormTitle() {
    return (
      <Typography
        variant="h6"
        style={{ textTransform: "capitalize", textAlign: "center" }}
      >
        Sign Up
      </Typography>
    )
  }

  //use modal then
  return (
    <Grid
      container
      direction="column"
      justify="center"
      wrap="nowrap"
      style={{ overflow: "hidden" }}
    >
      <FormTitle />
      <form>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignContent="center"
          wrap="nowrap"
          style={{ height: "50vh", padding: "1rem" }}
        >
          {inputs}
          <ProgrammeOptions
            programmes={programmes}
            value={tempLearner.programmeId}
            onChange={onLearnerInputChanged}
            label={"Available Programmes"}
            style={{ minWidth: "100%" }}
            name="programmeId"
          />
        </Grid>
      </form>
      {buttons}
    </Grid>
  )
}
