import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
//https://reactrouter.com/web/api

import { Navbar, NotFoundPage, Footer, ProtectedRoute } from "./app/register"

import { AllLearnersPage, LearnersPanel } from "./components/learners/register"
import { ScheduleUploader } from "./components/schedules/register"
import { HomePanel } from "./components/home/register"

function App() {
  const links = [
    {
      to: "/",
      label: "Home",
    },
    {
      to: "/learners",
      label: "Learners",
    },
    {
      to: "/schedules",
      label: "Schedules",
    },
    {
      to: "/schedules/new",
      label: "Publish Schedule",
    },
    {
      to: "/testLearners",
      label: "Learners Panel",
    },
  ]

  return (
    <Router>
      <Navbar links={links} />
      <div className="App main">
        {/* Switch ensure that only one component is rendered at a time You also register all your routes here! */}
        <Switch>
          <Route exact path="/login" component={HomePanel} />
          <ProtectedRoute exact path="/learners" component={AllLearnersPage} />
          <ProtectedRoute
            exact
            path="/schedules/new"
            component={ScheduleUploader}
          />
          <ProtectedRoute
            exact
            path="/testLearners"
            component={LearnersPanel}
          />
          <Route exact path="/error" component={NotFoundPage} />
          {/* basically a 404 page, but need to register it */}
          <Redirect to="/login" />
        </Switch>
      </div>
      <Footer />
    </Router>
  )
}

export default App
