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
  onScheduleNameChanged,
  scheduleName,
  label,
}) {
  const classes = useStyles()
  return (
    <TextField
      label={label}
      className={classes.scheduleName}
      onChange={onScheduleNameChanged}
      value={scheduleName}
      InputProps={{ className: classes.input }}
      InputLabelProps={{
        className: classes.formLabelRoot,
      }}
    />
  )
}
