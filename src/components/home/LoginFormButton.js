import React from "react"
import { Button } from "@material-ui/core"

export function LoginFormButton({ label, onClick, className }) {
  return (
    <Button
      type={label === "Sign Up" ? null : "submit"}
      onClick={onClick}
      variant="contained"
      color="secondary"
      className={className}
    >
      {label}
    </Button>
  )
}
