import React from "react"
import { Button } from "@material-ui/core"

export function LoginFormButton({ customClassName, label, onClick }) {
  return (
    <Button
      type="submit"
      //className={`${customClassName}`}
      onClick={onClick}
      variant="contained"
      color="secondary"
      style={{ fontSize: "0.65rem", maxWidth: "max-content" }}
    >
      {label}
    </Button>
  )
}
