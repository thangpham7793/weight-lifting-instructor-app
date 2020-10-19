import React from "react"

export function Logo({ style }) {
  return (
    <div className="logo-wrapper">
      <img
        style={style}
        className="logo"
        src={require("../../assets/logo.jpg")}
        alt="New Zealand Olympic Weight-Lifting Logo"
      />
    </div>
  )
}
