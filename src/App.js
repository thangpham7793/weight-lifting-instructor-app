import React, { useState } from "react"
import { BrowserRouter as Router, Redirect } from "react-router-dom"
//https://reactrouter.com/web/api

import { Navbar, Footer, PageRoutes } from "./app/register"

import { LearnersPanel } from "./components/learners/register"
import { SchedulePanel } from "./components/schedules/register"
import { HomePanel } from "./components/home/register"

import { UserAuth, NavHelpers } from "./services/register"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Montserrat", "sans-serif"],
  },
})

const allLinks = {
  instructor: [
    // {
    //   to: "/instructor",
    //   label: "Home Panel",
    //   component: HomePanel,
    //   isProtected: false,
    // },
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
      isProtected: false,
    },
  ],
  learner: [],
}

function App() {
  const [isInstructorLoggedIn, setIsInstructorLoggedIn] = useState(
    UserAuth.isAuthenticated()
  )

  const [isLearnerLoggedIn, setIsLearnerLoggedIn] = useState(false)

  const [links, setLinks] = useState(
    UserAuth.isAuthenticated() ? allLinks.instructor : []
  )

  function onLogIn() {
    setLinks(allLinks.instructor)
    setIsInstructorLoggedIn(true)
  }

  function onLogOut(e) {
    console.log("log me out!")
    UserAuth.clearToken()
    NavHelpers.clearCurrentPage()
    setLinks([])
    setIsInstructorLoggedIn(false)
    setIsLearnerLoggedIn(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar
          links={links}
          isInstructorLoggedIn={isInstructorLoggedIn}
          isLearnerLoggedIn={isLearnerLoggedIn}
          onLogOut={onLogOut}
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
            <HomePanel
              onLogIn={onLogIn}
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

export default App
