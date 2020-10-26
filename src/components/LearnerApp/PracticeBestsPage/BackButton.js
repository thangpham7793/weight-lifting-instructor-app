import { Grid } from "@material-ui/core"
import { ArrowBack } from "@material-ui/icons"
import React from "react"
import { useHistory } from "react-router-dom"
import { FormButton } from "./FormButton"

export function BackButton({
  to,
  label = "Back",
  classes = {},
  style,
  ...props
}) {
  const history = useHistory()
  return (
    <Grid container item justify="center" style={style || { padding: "1rem" }}>
      <FormButton
        classes={classes}
        label={label}
        icon={ArrowBack}
        onClick={() => {
          history.push(`${to}`)
        }}
        {...props}
      />
    </Grid>
  )
}
