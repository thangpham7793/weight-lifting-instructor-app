import React from "react"
import { LoginFormButton } from "./register"
import { Grid } from "@material-ui/core"
import { useHistory } from "react-router-dom"
import { quickStyles } from "../../services/register"

export function LoginFormButtonPanel({ type }) {
  const classes = quickStyles({
    wrapper: {
      margin: "0 auto",
    },
    instructorLoginBtn: { fontSize: "0.65rem", width: "100%" },
    learnerLoginBtns: { fontSize: "0.65rem", width: "40%" },
  })

  const history = useHistory()
  let btns

  if (type === "instructor") {
    btns = (
      <LoginFormButton label="Log In" className={classes.instructorLoginBtn} />
    )
  } else {
    btns = (
      <>
        <LoginFormButton
          onClick={() => history.push("/learner/signup")}
          label="Sign Up"
          className={classes.learnerLoginBtns}
        />
        <LoginFormButton label="Log In" className={classes.learnerLoginBtns} />
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
