import React from "react"
import { camelCaseToNormal } from "../../../utils"
import { TextField, Grid, Typography } from "@material-ui/core"

function PersonalBestInput({ label, ...props }) {
  return (
    <Grid item>
      <TextField
        label={camelCaseToNormal(label)}
        className="text-input"
        {...props}
      />
    </Grid>
  )
}

//for learnerApp
export function SingleRecordForm({ record, onRecordInputChange, saveBtn }) {
  //it does changes, but doesn't show on the UI
  const inputs = !record
    ? null
    : Object.keys(record).map((fieldName) => {
        if (
          ["learnerId", "pbId", "exerciseName", "lastEdited"].includes(
            fieldName
          )
        )
          return null
        return (
          <PersonalBestInput
            label={fieldName}
            name={fieldName}
            type="text"
            key={fieldName}
            value={record[fieldName]}
            onChange={onRecordInputChange}
          />
        )
      })

  function FormTitle({ exerciseName, repMax }) {
    return (
      <Typography
        variant="h5"
        style={{ textTransform: "capitalize", textAlign: "center" }}
      >{`${exerciseName} ${repMax} REPs`}</Typography>
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
      <FormTitle exerciseName={record.exerciseName} repMax={record.repMax} />
      <form>
        <Grid
          container
          direction="column"
          justify="space-around"
          align="center"
          style={{ height: "40vh" }}
        >
          {inputs}
        </Grid>
      </form>
      {saveBtn}
    </Grid>
  )
}
