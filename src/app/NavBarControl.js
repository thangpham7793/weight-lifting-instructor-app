import React, { useState, useEffect, useRef } from "react"
import { HorizontalNavBar, DrawerNavBar } from "./register"

//https://reactrouter.com/web/api/Redirect
export function NavBarControl({ links, onLogOut, onAppChange, pageTitle }) {
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth)
  const [navBarHeight, setNavBarHeight] = useState(0)

  const ref = useRef()

  useEffect(() => {
    function saveCurrentWidth() {
      setCurrentWidth(window.innerWidth)
    }

    function saveNavBarHeight() {
      setNavBarHeight(ref.current.scrollHeight)
    }

    saveNavBarHeight()

    window.addEventListener("resize", saveCurrentWidth)

    return () => {
      window.removeEventListener("resize", saveCurrentWidth)
    }
  }, [currentWidth])

  return (
    <nav className="header index" ref={ref} style={{ zIndex: 1000 }}>
      <section>
        {currentWidth <= 450 && links.length > 2 && navBarHeight > 0 ? (
          <DrawerNavBar
            pageTitle={pageTitle}
            links={links}
            onAppChange={onAppChange}
            onLogOut={onLogOut}
            navBarHeight={navBarHeight}
          />
        ) : (
          <HorizontalNavBar
            pageTitle={pageTitle}
            links={links}
            onAppChange={onAppChange}
            onLogOut={onLogOut}
          />
        )}
      </section>
    </nav>
  )
}
