import React from "react"

export function LoginFormButton({ customClassName, label, onClick }) {
  return (
    <button
      type="submit"
      className={`submit-btn ${customClassName}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
