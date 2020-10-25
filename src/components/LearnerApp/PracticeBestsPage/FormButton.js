import React from "react"
import { Button, Typography } from "@material-ui/core"
import { quickStyles } from "../../../services/register"

export function FormButton({
  onClick,
  label,
  icon,
  disabled,
  classes = {},
  ...props
}) {
  const Icon = icon

  if (!classes.formBtn && !classes.formBtnLabel) {
    classes = quickStyles({
      formBtn: {
        width: "max-content",
      },
      formBtnLabel: {
        fontSize: "0.5rem",
        marginRight: "0.5rem",
      },
    })
  }

  return (
    <Button
      variant="contained"
      color="secondary"
      name={label}
      onClick={onClick}
      className={classes.formBtn}
      disabled={disabled}
      {...props}
    >
      <Typography variant="button" className={classes.formBtnLabel}>
        {label}
      </Typography>
      <Icon fontSize="small" />
    </Button>
  )
}
