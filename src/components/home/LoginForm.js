import React from "react"
import { LoginFormButtonPanel, LoginFields } from "./register"

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

export function LoginForm({
  title,
  onFormSubmitted,
  errorMessage,
  type,
  credentials,
  onInputChanged,
  onSignUpBtnClicked,
}) {
  return (
    <>
      <h1
        style={{
          fontSize: "calc(var(--fs-md) * 0.75)",
          marginBottom: "3rem",
        }}
      >
        {title}
      </h1>
      <form className="login-form" onSubmit={onFormSubmitted}>
        <LoginFields
          credentials={credentials}
          onInputChanged={onInputChanged}
        />
        {<ErrorMessageDiv errorMessage={errorMessage} />}
        <LoginFormButtonPanel
          type={type}
          onSignUpBtnClicked={onSignUpBtnClicked}
        />
      </form>
    </>
  )
}
