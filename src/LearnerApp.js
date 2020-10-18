import React, { useState } from "react"
import { BrowserRouter as Router, Redirect } from "react-router-dom"
//https://reactrouter.com/web/api

import { Navbar, Footer, PageRoutes } from "./app/register"

import { LearnerSchedulePanel } from "./components/learners/register"
import { LearnerHomePanel } from "./components/home/register"

import { UserAuth, NavHelpers } from "./services/register"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Montserrat", "sans-serif"],
  },
})

const allLinks = {
  learner: [
    {
      to: "/learner/schedules",
      label: "Schedules",
      component: LearnerSchedulePanel,
      isProtected: true,
    },
  ],
  instructorApp: [
    {
      to: "/instructor",
      label: "Instructor Space",
      isProtected: false,
    },
  ],
}

export function LearnerApp({ onAppChange }) {
  const [isLearnerLoggedIn, setIsLearnerLoggedIn] = useState(
    UserAuth.isAuthenticated()
  )

  const [links, setLinks] = useState(
    UserAuth.isAuthenticated() ? allLinks.learner : allLinks.instructorApp
  )

  function onLearnerLogIn() {
    setLinks(allLinks.instructor)
    setIsLearnerLoggedIn(true)
  }

  function onLearnerLogOut(e) {
    console.log("log me out!")
    UserAuth.clearToken()
    NavHelpers.clearCurrentPage()
    setLinks(allLinks.instructorApp)
    setIsLearnerLoggedIn(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar
          links={links}
          onLogOut={onLearnerLogOut}
          pageTitle="Otago WeightLifting Learner Space"
          onAppChange={onAppChange}
        />
        <div className="App main">
          {isLearnerLoggedIn ? (
            //need to redirect user to where they currently are or schedules after login
            <Redirect
              to={
                NavHelpers.getCurrentPage()
                  ? NavHelpers.getCurrentPage()
                  : "/learner/schedules"
              }
            />
          ) : (
            <LearnerHomePanel
              onLearnerLogIn={onLearnerLogIn}
              isLearnerLoggedIn={isLearnerLoggedIn}
            />
          )}
          <PageRoutes links={links} />
        </div>
        <Footer />
      </Router>
    </ThemeProvider>
  )
}

export default LearnerApp
