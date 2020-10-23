import React from "react"
import { camelCaseToNormal } from "../../utils"
import { TextField, Grid, Typography } from "@material-ui/core"

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
  onLearnerInputChange,
  buttons,
  isInputValid,
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
    return (
      <NewLearnerInput
        label={fieldName}
        name={fieldName}
        type="text"
        key={fieldName}
        value={
          fieldName === "lastEdited"
            ? new Date(tempLearner[fieldName]).toDateString()
            : tempLearner[fieldName]
        }
        onChange={onLearnerInputChange}
        error={!isInputValid[`${fieldName}`]}
        helperText={pickHelperText(fieldName, isInputValid[`${fieldName}`])}
        disabled={fieldName === "lastEdited"}
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
      style={{ overflow: "hidden" }}
    >
      <FormTitle />
      <form>
        <Grid
          container
          direction="column"
          justify="space-evenly"
          alignContent="center"
          style={{ height: "40vh" }}
        >
          {inputs}
        </Grid>
      </form>
      {buttons}
    </Grid>
  )
}
