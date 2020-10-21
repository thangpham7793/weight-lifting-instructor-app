import React from "react"
import { Link } from "react-router-dom"

export function HorizontalNavBar({ pageTitle, links, onAppChange, onLogOut }) {
  let navLinks

  if (links.length === 1 && !links[0].component) {
    navLinks = [
      <span
        className="nav-item"
        key={links[0].to}
        onClick={onAppChange}
        to={links[0].to}
      >
        {links[0].label}
      </span>,
    ]
  } else {
    navLinks = links
      .filter(({ display }) => display === true)
      .map(({ to, label }) => {
        return to !== "/logout" ? (
          <Link key={to} to={to} className="nav-item">
            {label}
          </Link>
        ) : (
          //basically need to make a fake link here!
          <span className="nav-item" key={to} label={label} onClick={onLogOut}>
            {label}
          </span>
        )
      })
  }

  return (
    <div className="navContent">
      <header>
        <h1
          style={{
            fontWeight: "var(--fw-lg)",
            fontSize: "calc(0.35 * var(--fs-md))",
          }}
        >
          {pageTitle}
        </h1>
        <div className="navLinks">{navLinks}</div>
      </header>
    </div>
  )
}
