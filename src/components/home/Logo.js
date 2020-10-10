import React from "react"

export function Logo() {
  return (
    <div className="logo-wrapper">
      <img
        className="logo"
        src={require("../../assets/logo.jpg")}
        alt="New Zealand Olympic Weight-Lifting Logo"
      />
    </div>
  )
}
