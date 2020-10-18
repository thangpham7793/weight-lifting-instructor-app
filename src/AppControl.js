import React, { useState } from "react"
import { App } from "./register"
import { NavHelpers } from "./services/register"

export default function AppControl() {
  //FIXME: this will always get back to instructor app and log the user in! Should have separate auth for different user. It could also be the routing as well, since refreshing instructor app pages work fine
  const [currentApp, setCurrentApp] = useState("/instructor")

  function onAppChange(e) {
    console.log(e.target.getAttribute("to"))
    NavHelpers.clearCurrentPage()
    NavHelpers.currentApp = e.target.getAttribute("to")
    setCurrentApp(e.target.getAttribute("to"))
  }

  return <App currentApp={currentApp} onAppChange={onAppChange} />
}
