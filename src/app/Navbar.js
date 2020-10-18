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
export const Navbar = ({ links, onLogOut }) => {
  let navLinks = links
    ? links.map(({ to, label }) => {
        return to !== "/logout" ? (
          <NavLink key={to} to={to} label={label} />
        ) : (
          //basically need to make a fake link here!
          <span class="nav-item" key={to} label={label} onClick={onLogOut}>
            {label}
          </span>
        )
      })
    : null

  return (
    <nav className="header index">
      <section>
        <div className="navContent">
          <header>
            <h1 className="main-title">Otago Weightlifting Instructor Space</h1>
          </header>
          <div className="navLinks">{navLinks}</div>
        </div>
      </section>
    </nav>
  )
}
