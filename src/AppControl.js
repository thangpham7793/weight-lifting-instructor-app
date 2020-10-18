import React, { useState } from "react"
import { App } from "./register"

export default function AppControl() {
  const [currentApp, setCurrentApp] = useState("/instructor")

  function onAppChange(e) {
    console.log(e.target.getAttribute("to"))
    setCurrentApp(e.target.getAttribute("to"))
  }

  return <App currentApp={currentApp} onAppChange={onAppChange} />
}
