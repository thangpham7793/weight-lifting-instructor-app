import React from "react"
import { Link } from "react-router-dom"

function NavLink({ to, label }) {
  return (
    <Link to={to} className="nav-item">
      {label}
    </Link>
  )
}

//https://reactrouter.com/web/api/Redirect
export const Navbar = ({ links, onLogOut, onAppChange, pageTitle }) => {
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
          <NavLink key={to} to={to} label={label} />
        ) : (
          //basically need to make a fake link here!
          <span className="nav-item" key={to} label={label} onClick={onLogOut}>
            {label}
          </span>
        )
      })
  }

  return (
    <nav className="header index">
      <section>
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
          </header>
          <div className="navLinks">{navLinks}</div>
        </div>
      </section>
    </nav>
  )
}
