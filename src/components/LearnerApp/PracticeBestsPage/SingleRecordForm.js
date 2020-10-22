import React from "react"
import { camelCaseToNormal } from "../../../utils"
import { TextField, Grid, Typography, InputAdornment } from "@material-ui/core"

function InputEndAdornMent({ fieldName }) {
  switch (fieldName) {
    case "weight":
      return <InputAdornment position="end">Kg</InputAdornment>
    case "repMax":
      return <InputAdornment position="end">Times</InputAdornment>
    default:
      return null
  }
}

function PersonalBestInput({ label, ...props }) {
  return (
    <Grid item>
      <TextField
        label={camelCaseToNormal(label)}
        className="text-input"
        {...props}
        InputProps={{
          endAdornment: <InputEndAdornMent fieldName={label} />,
          required: true,
        }}
      />
    </Grid>
  )
}

//for learnerApp
export function SingleRecordForm({
  record,
  onRecordInputChange,
  buttons,
  isInputValid,
}) {
  function pickHelperText(fieldName, isValid) {
    if (fieldName === "weight" && isValid === false) {
      return "Must Be A Positive Number"
    }

    if (fieldName === "repMax" && isValid === false) {
      return "Please enter a Valid Rep Max from x1 to x10"
    }

    if (fieldName === "lastEdited" && isValid === false) {
      return "Please enter a valid Date!"
    }

    return null
  }

  //it does changes, but doesn't show on the UI
  const inputs = !record
    ? null
    : Object.keys(record).map((fieldName) => {
        if (["learnerId", "pbId", "exerciseName"].includes(fieldName))
          return null
        return (
          <PersonalBestInput
            label={fieldName}
            name={fieldName}
            type="text"
            key={fieldName}
            value={
              fieldName === "lastEdited"
                ? new Date(record[fieldName]).toDateString()
                : record[fieldName]
            }
            onChange={onRecordInputChange}
            error={!isInputValid[`${fieldName}`]}
            helperText={pickHelperText(fieldName, isInputValid[`${fieldName}`])}
            disabled={fieldName === "lastEdited"}
          />
        )
      })

  function FormTitle({ exerciseName, repMax, lastEdited }) {
    return (
      <Typography
        variant="h6"
        style={{ textTransform: "capitalize", textAlign: "center" }}
      >
        {`${exerciseName}`}
        <br />
        {`${repMax} REPs`}
        <br />
        <small
          style={{ fontSize: "1rem", opacity: "0.75", fontStyle: "italic" }}
        >
          {new Date(lastEdited).toDateString()}
        </small>
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
      <FormTitle {...record} />
      <form>
        <Grid
          container
          direction="column"
          justify="space-evenly"
          align="center"
          style={{ height: "40vh" }}
        >
          {inputs}
        </Grid>
      </form>
      {buttons}
    </Grid>
  )
}
