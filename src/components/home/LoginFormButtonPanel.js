import React from "react"
import { LoginFormButton } from "./register"
import { Grid } from "@material-ui/core"

export function LoginFormButtonPanel({ type }) {
  let btns

  if (type === "instructor") {
    btns = <LoginFormButton customClassName="login right" label="Log In" />
  } else {
    btns = (
      <>
        <LoginFormButton customClassName="login left" label="Sign Up" />
        <LoginFormButton customClassName="login right" label="Log In" />
      </>
    )
  }
  return (
    <Grid
      item
      container
      xs={10}
      md={8}
      lg={4}
      justify="space-evenly"
      wrap="nowrap"
      style={{ margin: "0 auto", width: "100%" }}
      // className="submit-btn-container"
    >
      {btns}
    </Grid>
  )
}
