import React from "react"
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { range } from "../../utils"

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    maxWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

export function WeekOptions({
  selectedSchedule,
  onWeekSelected,
  selectedWeek,
  label,
}) {
  const classes = useStyles()

  if (!selectedSchedule) return null

  const items = range(selectedSchedule.weekCount).map((v) => {
    return (
      <MenuItem value={v} key={v}>
        {v}
      </MenuItem>
    )
  })

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <InputLabel id="week">{label}</InputLabel>
      <Select
        labelId="week"
        id="week"
        value={selectedWeek}
        onChange={onWeekSelected}
      >
        {items}
      </Select>
    </FormControl>
  )
}
