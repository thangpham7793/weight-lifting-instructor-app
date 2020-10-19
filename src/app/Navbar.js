import React from "react"
import { Link } from "react-router-dom"

function NavLink({ to, label, onClick }) {
  return (
    <Link to={to} className="nav-item" onClick={onClick}>
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
    navLinks = links.map(({ to, label }) => {
      return to !== "/logout" ? (
        <NavLink
          key={to}
          to={to}
          label={label}
          onClick={() => console.log(`Take me to ${to}`)}
        />
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
            <h1 className="main-title">{pageTitle}</h1>
          </header>
          <div className="navLinks">{navLinks}</div>
        </div>
      </section>
    </nav>
  )
}
