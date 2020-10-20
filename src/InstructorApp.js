import React, { useState } from "react"
import { BrowserRouter as Router, Redirect } from "react-router-dom"
//https://reactrouter.com/web/api

import { Navbar, Footer, PageRoutes } from "./app/register"

import { LearnersPanel } from "./components/learners/register"
import { SchedulePanel } from "./components/schedules/register"
import {
  InstructorLoginPage,
  InstructorAccountPage,
} from "./components/home/register"

import { UserAuth, NavHelpers } from "./services/register"

const allLinks = {
  instructor: [
    {
      to: "/instructor/schedules",
      label: "Schedules",
      component: SchedulePanel,
      isProtected: true,
      display: true,
    },
    {
      to: "/instructor/learners",
      label: "Learners Panel",
      component: LearnersPanel,
      isProtected: true,
      display: true,
    },
    {
      to: "/instructor/account",
      label: "Account",
      component: InstructorAccountPage,
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
  ],
  learnerApp: [
    {
      to: "/learner/login",
      label: "Learner Space",
      isProtected: false,
      display: true,
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
    NavHelpers.setCurrentPage("/instructor/login")
    setLinks(allLinks.learnerApp)
    setIsInstructorLoggedIn(false)
  }

  return (
    <Router>
      <Navbar
        links={links}
        pageTitle="Otago Weightlifting Instructor Space"
        onLogOut={onInstructorLogOut}
        onAppChange={onAppChange}
      />
      <div className="App main">
        {isInstructorLoggedIn ? (
          <Redirect
            to={
              NavHelpers.getCurrentPage() !== "/instructor/login"
                ? NavHelpers.getCurrentPage()
                : "/instructor/schedules"
            }
          />
        ) : (
          <InstructorLoginPage onInstructorLogIn={onInstructorLogIn} />
        )}
        <PageRoutes links={links} />
      </div>
      <Footer />
    </Router>
  )
}

export default InstructorApp
