import React from "react"
import { FormControl, Select, MenuItem } from "@material-ui/core"
import { quickStyles } from "../../services/register"
import { exerciseNames } from "../../reducers/exerciseNames"

export function ExerciseNameOptions({
  onExerciseNameSelected,
  selectedExerciseName,
}) {
  const classes = quickStyles({
    formControl: {
      maxWidth: "100%",
      textTransform: "capitalize",
    },
    selectEmpty: {
      marginTop: "1rem",
    },
    select: {
      paddingRight: "0.5rem",
    },
  })

  const items = exerciseNames.map((v) => {
    return (
      <MenuItem value={v} key={v}>
        {v}
      </MenuItem>
    )
  })

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <Select
        value={selectedExerciseName || exerciseNames[0]}
        onChange={onExerciseNameSelected}
        className={classes.select}
      >
        {items}
      </Select>
    </FormControl>
  )
}
