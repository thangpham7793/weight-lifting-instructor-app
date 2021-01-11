import React from "react"
import { NavLink } from "react-router-dom"

export function HorizontalNavBar({ pageTitle, links, onAppChange, onLogOut }) {
  let navLinks

  if (links.length <= 2) {
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
          <NavLink
            key={to}
            to={to}
            className="nav-item"
            activeClassName="current-page"
            activeStyle={{
              fontWeight: "600",
              pointerEvents: "none",
              cursor: "default",
            }}
          >
            {label}
          </NavLink>
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
