import React from "react"
import { Link } from "react-router-dom"

function NavLink({ to, label }) {
  return (
    <Link to={to} className="nav-item">
      {label}
    </Link>
  )
}

function setPageTitle(isInstructorLoggedIn, isLearnerLoggedIn) {
  if (isInstructorLoggedIn) {
    return "Otago Weightlifting Instructor Space"
  }
  if (isLearnerLoggedIn) {
    return "Otago Weightlifting Learner Space"
  }
  return "Otago Weightlifting"
}

//https://reactrouter.com/web/api/Redirect
export const Navbar = ({
  links,
  onLogOut,
  isInstructorLoggedIn,
  isLearnerLoggedIn,
}) => {
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
            <h1 className="main-title">
              {setPageTitle(isInstructorLoggedIn, isLearnerLoggedIn)}
            </h1>
          </header>
          <div className="navLinks">{navLinks}</div>
        </div>
      </section>
    </nav>
  )
}
