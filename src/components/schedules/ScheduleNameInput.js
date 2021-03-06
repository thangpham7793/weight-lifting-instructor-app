import React from "react"
import { TextField, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  scheduleName: {
    marginBottom: "var(--mg-sm)",
  },
  input: {
    fontFamily: "var(--ff)",
    color: "#001e18",
    marginBottom: "var(--mg-sm)",
  },
  formLabelRoot: {
    fontFamily: "var(--ff)",
    color: "var(--txt-cl)",
  },
  formLabelFocused: {
    fontFamily: "var(--ff)",
    color: "var(--txt-cl)",
    "'& label.Mui-focused'": {
      fontFamily: "var(--ff)",
      color: "var(--txt-cl)",
    },
  },
}))

export function ScheduleNameInput({
  onClickedScheduleNameChanged,
  scheduleName,
  label,
}) {
  const classes = useStyles()
  return (
    <TextField
      label={label}
      className={classes.scheduleName}
      onChange={onClickedScheduleNameChanged}
      value={scheduleName}
      InputProps={{ className: classes.input }}
      InputLabelProps={{
        className: classes.formLabelRoot,
      }}
      error={scheduleName.length <= 5}
      helperText={
        scheduleName.length <= 5 && "Must be at least 5 characters long"
      }
    />
  )
}
