import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { HorizontalNavBar, DrawerNavBar } from "./register"

function NavLink({ to, label }) {
  return (
    <Link to={to} className="nav-item">
      {label}
    </Link>
  )
}

//https://reactrouter.com/web/api/Redirect
export function NavBarControl({ links, onLogOut, onAppChange, pageTitle }) {
  let navLinks

  const [currentWidth, setCurrentWidth] = useState(window.innerWidth)

  useEffect(() => {
    function saveCurrentWidth() {
      setCurrentWidth(window.innerWidth)
    }

    window.addEventListener("resize", saveCurrentWidth)

    return () => {
      window.removeEventListener("resize", saveCurrentWidth)
    }
  }, [currentWidth])

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
        {currentWidth <= 450 && links.length > 1 ? (
          <DrawerNavBar
            pageTitle={pageTitle}
            navLinks={navLinks}
            links={links}
            onAppChange={onAppChange}
            onLogOut={onLogOut}
          />
        ) : (
          <HorizontalNavBar
            pageTitle={pageTitle}
            navLinks={navLinks}
            links={links}
            onAppChange={onAppChange}
            onLogOut={onLogOut}
          />
        )}
      </section>
    </nav>
  )
}