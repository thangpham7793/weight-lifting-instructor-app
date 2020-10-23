import React, { useState } from "react"
import { BrowserRouter as Router, Redirect } from "react-router-dom"
//https://reactrouter.com/web/api

import { NavBarControl, Footer, PageRoutes } from "./app/register"

import { FitnessCenter, ExitToApp, TodayOutlined } from "@material-ui/icons"
import {
  ExercisePage,
  LearnerSchedulePage,
} from "./components/learners/register"
import { LearnerLoginPage } from "./components/home/register"
import {
  LearnerPracticeBestsPage,
  SingleExercisePage,
} from "./components/LearnerApp/register"

import { UserAuth, NavHelpers } from "./services/register"

//NOTE: the desired order of navBar item does not match with that of the regex parser
const allLinks = {
  learner: [
    {
      to: "/learner/schedules",
      label: "Schedules",
      component: LearnerSchedulePage,
      isProtected: true,
      display: true,
      icon: TodayOutlined,
    },
    {
      to: "/learner/practice.bests",
      label: "Practice Bests",
      component: LearnerPracticeBestsPage,
      isProtected: true,
      display: true,
      icon: FitnessCenter,
    },
    {
      to: "/logout",
      label: "Log Out",
      component: null,
      isProtected: true,
      display: true,
      icon: ExitToApp,
    },
    {
      to: "/practice.bests/:exerciseName", //using /learner/practice.bests will match with the previous item above https://reactrouter.com/web/guides/primary-components
      label: "Practice Best",
      component: SingleExercisePage,
      isProtected: true,
      display: false,
    },
    {
      to: "/learner/:scheduleId/:week",
      label: "Exercises",
      component: ExercisePage,
      isProtected: true,
      display: false,
    },
  ],
  instructorApp: [
    {
      to: "/instructor/login",
      label: "Instructor Space",
      isProtected: false,
      display: true,
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
    setLinks(allLinks.learner)
    setIsLearnerLoggedIn(true)
  }

  function onLearnerLogOut(e) {
    console.log("log me out!")
    UserAuth.clearToken()
    NavHelpers.setCurrentPage("/learner/login")
    setLinks(allLinks.instructorApp) //this also makes sure that only the login page is registered as a route when user's logged out
    setIsLearnerLoggedIn(false)
  }

  return (
    <Router>
      <NavBarControl
        links={links}
        onLogOut={onLearnerLogOut}
        pageTitle="Otago WeightLifting Learner Space"
        onAppChange={onAppChange}
      />
      <div className="App main">
        {isLearnerLoggedIn ? (
          <Redirect
            to={
              NavHelpers.getCurrentPage() !== "/learner/login" &&
              NavHelpers.getCurrentPage() !== null
                ? NavHelpers.getCurrentPage()
                : "/learner/practice.bests"
            }
          />
        ) : (
          <LearnerLoginPage
            onLearnerLogIn={onLearnerLogIn}
            isLearnerLoggedIn={isLearnerLoggedIn}
          />
        )}
        <PageRoutes links={links} />
      </div>
      <Footer />
    </Router>
  )
}

export default LearnerApp
