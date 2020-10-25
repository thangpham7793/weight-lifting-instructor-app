import React from "react"
import { FormControl, Select, MenuItem, Typography } from "@material-ui/core"
import { quickStyles } from "../../services/register"

export function DayOptions({ exercises, onDaySelected, selectedDay, label }) {
  const classes = quickStyles({
    formControl: {
      margin: "1rem",
      maxWidth: "100%",
      textTransform: "capitalize",
    },
    selectEmpty: {
      marginTop: "1rem",
    },
    select: {
      paddingRight: "0.75rem",
    },
  })

  if (!exercises)
    return <Typography component="p">No {label} Available</Typography>

  const items = exercises.map((v) => {
    return (
      <MenuItem value={v} key={v}>
        {v}
      </MenuItem>
    )
  })

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <Select
        value={selectedDay}
        onChange={onDaySelected}
        className={classes.select}
      >
        {items}
      </Select>
    </FormControl>
  )
}
