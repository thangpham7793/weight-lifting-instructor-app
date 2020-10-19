import React from "react"
import { LoginFormButton } from "./register"
import { Grid } from "@material-ui/core"

function ErrorMessageDiv({ errorMessage }) {
  return (
    <div className="error-message-wrapper">
      <p
        className="error-message"
        style={{ visibility: errorMessage ? "visible" : "hidden" }}
      >
        {errorMessage}
      </p>
    </div>
  )
}

function LoginFormButtonPanel({ type }) {
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
      xs={10}
      md={8}
      lg={4}
      style={{ margin: "0 auto", display: "flex" }}
      // className="submit-btn-container"
    >
      {btns}
    </Grid>
  )
}

export function LoginForm({
  title,
  onFormSubmitted,
  fields,
  errorMessage,
  type,
}) {
  return (
    <>
      <h1
        style={{
          fontSize: "calc(var(--fs-md) * 0.75)",
          marginBottom: "var(--mg-md)",
        }}
      >
        {title}
      </h1>
      <form className="login-form" onSubmit={onFormSubmitted}>
        {fields}
        {<ErrorMessageDiv errorMessage={errorMessage} />}
        <LoginFormButtonPanel type={type} />
      </form>
    </>
  )
}
