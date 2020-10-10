import React from "react"

export function LoginFormTextInput({ label, onInputChanged, fieldValue }) {
  return (
    <div className={`field-container ${label}`}>
      <label htmlFor={label} className={`search-form-label index ${label}`}>
        {label}
      </label>
      <input
        id={label}
        name={label}
        className="text-input"
        type={label === "password" ? "password" : "text"}
        onChange={onInputChanged}
        value={fieldValue}
      />
    </div>
  )
}
