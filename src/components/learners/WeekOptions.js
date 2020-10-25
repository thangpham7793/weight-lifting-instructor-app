import React from "react"
import { FormControl, Select, MenuItem } from "@material-ui/core"
import { range } from "../../utils"
import { quickStyles } from "../../services/register"

export function WeekOptions({ weekCount, onWeekSelected, selectedWeek }) {
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
      paddingRight: "0.5rem",
    },
  })

  if (!weekCount) return null

  const items = range(weekCount).map((v) => {
    return (
      <MenuItem value={v} key={v}>
        Week {v}
      </MenuItem>
    )
  })

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <Select
        value={selectedWeek}
        onChange={onWeekSelected}
        className={classes.select}
      >
        {items}
      </Select>
    </FormControl>
  )
}
