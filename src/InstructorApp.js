import React, { useState } from "react"
import { BrowserRouter as Router, Redirect } from "react-router-dom"
//https://reactrouter.com/web/api

import { Navbar, Footer, PageRoutes } from "./app/register"

import { LearnersPanel } from "./components/learners/register"
import { SchedulePanel } from "./components/schedules/register"
import { InstructorHomePanel } from "./components/home/register"

import { UserAuth, NavHelpers } from "./services/register"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Montserrat", "sans-serif"],
  },
})

const allLinks = {
  instructor: [
    {
      to: "/instructor/schedules",
      label: "Schedules",
      component: SchedulePanel,
      isProtected: true,
    },
    {
      to: "/instructor/learners",
      label: "Learners Panel",
      component: LearnersPanel,
      isProtected: true,
    },
    {
      to: "/logout",
      label: "Log Out",
      component: null,
      isProtected: true,
    },
  ],
  learnerApp: [
    {
      to: "/learner",
      label: "Learner Space",
      isProtected: false,
    },
  ],
}

export function InstructorApp({ onAppChange }) {
  const [isInstructorLoggedIn, setIsInstructorLoggedIn] = useState(
    UserAuth.isAuthenticated()
  )

  const [links, setLinks] = useState(
    UserAuth.isAuthenticated() ? allLinks.instructor : allLinks.learnerApp
  )

  function onInstructorLogIn() {
    setLinks(allLinks.instructor)
    setIsInstructorLoggedIn(true)
  }

  //lets see if there's any difference
  function onInstructorLogOut(e) {
    console.log("log me out!")
    UserAuth.clearToken()
    NavHelpers.clearCurrentPage()
    setLinks(allLinks.learnerApp)
    setIsInstructorLoggedIn(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar
          links={links}
          pageTitle="Otago Weightlifting Instructor Space"
          onLogOut={onInstructorLogOut}
          onAppChange={onAppChange}
        />
        <div className="App main">
          {isInstructorLoggedIn ? (
            //need to redirect user to where they currently are or schedules after login
            <Redirect
              to={
                NavHelpers.getCurrentPage()
                  ? NavHelpers.getCurrentPage()
                  : "/instructor/schedules"
              }
            />
          ) : (
            <InstructorHomePanel
              onInstructorLogIn={onInstructorLogIn}
              isInstructorLoggedIn={isInstructorLoggedIn}
            />
          )}
          <PageRoutes links={links} />
        </div>
        <Footer />
      </Router>
    </ThemeProvider>
  )
}

export default InstructorApp
