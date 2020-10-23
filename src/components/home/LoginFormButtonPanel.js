import React from "react"
import { LoginFormButton } from "./register"
import { Grid } from "@material-ui/core"
import { quickStyles } from "../../services/register"

export function LoginFormButtonPanel({ type, onSignUpBtnClicked }) {
  const classes = quickStyles({
    wrapper: {
      margin: "0 auto",
    },
    instructorLoginBtn: { fontSize: "0.65rem", width: "100%" },
    learnerLoginPageBtns: { fontSize: "0.65rem", width: "40%" },
  })

  let btns
  if (type === "instructor") {
    btns = (
      <LoginFormButton label="Log In" className={classes.instructorLoginBtn} />
    )
  } else {
    btns = (
      <>
        <LoginFormButton
          onClick={onSignUpBtnClicked}
          label="Sign Up"
          className={classes.learnerLoginPageBtns}
        />
        <LoginFormButton
          label="Log In"
          className={classes.learnerLoginPageBtns}
        />
      </>
    )
  }
  return (
    <Grid
      item
      container
      justify="space-between"
      xs={10}
      sm={6}
      md={4}
      lg={3}
      className={classes.wrapper}
    >
      {btns}
    </Grid>
  )
}
