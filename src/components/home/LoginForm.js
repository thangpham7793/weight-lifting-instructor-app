import React from "react"
import { LoginFormButton } from "./register"

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

export function LoginForm({ onFormSubmitted, fields, errorMessage }) {
  return (
    <h1>
      <h1 className="login-form-title">Login</h1>
      <form className="login-form" onSubmit={onFormSubmitted}>
        {fields}
        {<ErrorMessageDiv errorMessage={errorMessage} />}
        <div class="submit-btn-container">
          <LoginFormButton customClassName="login right" label="Log In" />
        </div>
      </form>
    </h1>
  )
}
