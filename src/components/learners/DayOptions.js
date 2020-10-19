import React from "react"
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
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
  select: {
    paddingRight: theme.spacing(4),
  },
}))

export function DayOptions({ exercises, onDaySelected, selectedDay, label }) {
  const classes = useStyles()

  if (!exercises)
    return <Typography component="p">No {label} Available</Typography>

  const items = Object.keys(exercises).map((v) => {
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
