import React from "react"
import { Button, Typography } from "@material-ui/core"

export function FormButton({ onClick, classes, label, icon, disabled }) {
  const Icon = icon

  return (
    <Button
      variant="contained"
      color="secondary"
      name={label}
      onClick={onClick}
      className={classes.formBtn}
      disabled={disabled}
    >
      <Typography variant="button" className={classes.formBtnLabel}>
        {label}
      </Typography>
      <Icon fontSize="small" />
    </Button>
  )
}
