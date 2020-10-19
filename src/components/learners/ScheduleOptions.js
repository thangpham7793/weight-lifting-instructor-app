import React from "react"
import {
  FormControl,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    maxWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  label: {
    fontWeight: "var(--fw-md)",
  },
}))

export function ScheduleOptions({
  schedules,
  onScheduleChecked,
  label,
  selectedSchedule,
}) {
  const classes = useStyles()

  if (!schedules)
    return <Typography component="p">No Cycle Available</Typography>

  const items = schedules.map(({ scheduleName, scheduleId }) => {
    return (
      <MenuItem value={scheduleId} key={scheduleId}>
        {scheduleName}
      </MenuItem>
    )
  })

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <InputLabel id="cycle" className={classes.label}>
        {label}
      </InputLabel>
      <Select value={selectedSchedule.scheduleId} onChange={onScheduleChecked}>
        {items}
      </Select>
    </FormControl>
  )
}
