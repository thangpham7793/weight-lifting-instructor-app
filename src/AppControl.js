import React, { useState } from "react"
import { App } from "./register"
import { NavHelpers } from "./services/register"

export default function AppControl() {
  //FIXME: this will always get back to instructor app and log the user in! Should have separate auth for different user. It could also be the routing as well, since refreshing instructor app pages work fine
  const [currentPage, setCurrentPage] = useState(
    NavHelpers.getCurrentPage() ? NavHelpers.getCurrentPage() : "/learner/login"
  )

  function onAppChange(e) {
    const targetPage = e.target.getAttribute("to")
    console.log(targetPage)
    NavHelpers.currentApp = targetPage
    NavHelpers.setCurrentPage(targetPage)
    setCurrentPage(targetPage)
  }

  return <App currentPage={currentPage} onAppChange={onAppChange} />
}

//if there is no current page, redirects to learner's login
//learners should be redirect to schedule page after login
//refreshing should reload the current page
