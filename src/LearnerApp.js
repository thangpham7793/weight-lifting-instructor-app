import React, { useState } from "react"
import { BrowserRouter as Router, Redirect } from "react-router-dom"
//https://reactrouter.com/web/api

import { Navbar, Footer, PageRoutes } from "./app/register"

import {
  ExercisePage,
  LearnerSchedulePage,
} from "./components/learners/register"
import { LearnerLoginPage } from "./components/home/register"
import { LearnerPracticeBestsPage } from "./components/learners/LearnerPracticeBestsPage"

import { UserAuth, NavHelpers } from "./services/register"

const allLinks = {
  learner: [
    {
      to: "/learner/schedules",
      label: "Schedules",
      component: LearnerSchedulePage,
      isProtected: true,
      display: true,
    },
    {
      to: "/learner/practice.bests",
      label: "Practice Bests",
      component: LearnerPracticeBestsPage,
      isProtected: true,
      display: true,
    },
    {
      to: "/logout",
      label: "Log Out",
      component: null,
      isProtected: true,
      display: true,
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
      <Navbar
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
                : "/learner/schedules"
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
