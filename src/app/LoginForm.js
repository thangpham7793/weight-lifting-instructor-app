import React, { useState } from "react"

function TextInput({ label, onInputChanged, fieldValue }) {
  return (
    <div className={`"field-container ${label}"`}>
      <label htmlFor={label} className={`"search-form-label index ${label}`}>
        {label}
      </label>
      <input
        name={label}
        className="text-input"
        type={label === "password" ? "password" : "text"}
        onChange={onInputChanged}
        value={fieldValue}
      />
    </div>
  )
}

function LoginFormButton({ customClassName, label }) {
  return (
    <button type="submit" className={`"submit-btn ${customClassName}`}>
      {label}
    </button>
  )
}

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

export function LoginForm() {
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [errorMessage, setErrorMessage] = useState(null)

  function onInputChanged(e) {
    const changedField = e.target.getAttribute("name")
    const newValue = e.target.value.trim()
    setCredentials((c) => {
      c[changedField] = newValue
      console.log(c)
      return c
    })
  }

  function isNotEmpty(str) {
    return str.trim().length > 0
  }

  function validateCredentials({ username, password }) {
    console.log(isNotEmpty(username), isNotEmpty(password))
    if (isNotEmpty(username) && isNotEmpty(password)) {
      return null
    } else {
      return "Missing Username or Password"
    }
  }

  async function onFormSubmitted(e) {
    e.preventDefault()
    const error = validateCredentials(credentials)
    if (error) {
      setErrorMessage(error)
      return
    }
    setErrorMessage(null)
    console.log("Logging in with ", credentials)
  }

  const fields = Object.keys(credentials).map((fieldName) => (
    <TextInput
      key={fieldName}
      label={fieldName}
      onInputChanged={onInputChanged}
      value={credentials[fieldName]}
    />
  ))

  return (
    <form className="login-form" onSubmit={onFormSubmitted}>
      {fields}
      <ErrorMessageDiv errorMessage={errorMessage} />
      <div class="submit-btn-container">
        <LoginFormButton customClassName="login right" label="Log In" />
      </div>
    </form>
  )
}
