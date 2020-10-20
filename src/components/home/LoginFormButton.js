import React from "react"
import { Button } from "@material-ui/core"

export function LoginFormButton({ label, onClick }) {
  return (
    <Button
      type="submit"
      onClick={onClick}
      variant="contained"
      color="secondary"
      style={{ fontSize: "0.65rem", maxWidth: "max-content" }}
    >
      {label}
    </Button>
  )
}
