import React from "react"
import { FormControl, Select, MenuItem } from "@material-ui/core"
import { Check } from "@material-ui/icons"
import { quickStyles } from "../../services/register"
import { exerciseNames } from "../../reducers/exerciseNames"

export function ExerciseNameOptions({
  onExerciseNameSelected,
  selectedExerciseName,
  availableExercises = [],
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
    const isAvailable = availableExercises.includes(v)
    return (
      <MenuItem
        value={v}
        key={v}
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: isAvailable ? "var(--bg-cl)" : "#333",
          backgroundColor: isAvailable ? "var(--txt-cl)" : "#fff",
        }}
      >
        {v}
        {isAvailable && <Check fontSize="small" />}
      </MenuItem>
    )
  })

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <Select
        value={selectedExerciseName || exerciseNames[0]}
        onChange={onExerciseNameSelected}
        className={classes.select}
        id="learner-panel-exercise-select"
      >
        {items}
      </Select>
    </FormControl>
  )
}
