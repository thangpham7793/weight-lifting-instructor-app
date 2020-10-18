import React, { useState } from "react"
import { BrowserRouter as Router, Redirect } from "react-router-dom"
//https://reactrouter.com/web/api

import { Navbar, Footer, PageRoutes } from "./app/register"

import {
  LearnersPanel,
  LearnerSchedulePanel,
} from "./components/learners/register"
import { SchedulePanel } from "./components/schedules/register"
import {
  InstructorHomePanel,
  LearnerHomePanel,
} from "./components/home/register"

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
  learner: [
    {
      to: "/learner/schedules",
      label: "Schedules",
      component: LearnerSchedulePanel,
      isProtected: true,
    },
  ],
  learnerLogIn: [
    {
      to: "/learner",
      label: "Learner Login",
      component: LearnerHomePanel,
      isProtected: false,
    },
  ],
  instructorLogin: [
    {
      to: "/instructor",
      label: "Instructor Login",
      component: InstructorHomePanel,
      isProtected: false,
    },
  ],
}

function App() {
  const [isInstructorLoggedIn, setIsInstructorLoggedIn] = useState(
    UserAuth.isAuthenticated()
  )

  const [isLearnerLoggedIn, setIsLearnerLoggedIn] = useState(false)

  const [links, setLinks] = useState(
    UserAuth.isAuthenticated() ? allLinks.instructor : []
  )

  function onInstructorLogIn() {
    setLinks(allLinks.instructor)
    setIsInstructorLoggedIn(true)
  }

  function resetStatesOnLogOut() {
    setLinks([])
    setIsInstructorLoggedIn(false)
    setIsLearnerLoggedIn(false)
  }

  //lets see if there's any difference
  function onInstructorLogOut(e) {
    console.log("log me out!")
    UserAuth.clearToken()
    NavHelpers.clearCurrentPage()
    resetStatesOnLogOut()
  }

  function onLearnerLogOut(e) {
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
          onInstructorLogOut={onInstructorLogOut}
          isLearnerLoggedIn={isLearnerLoggedIn}
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

export default App
