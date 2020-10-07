import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import { Footer } from "./app/Footer"
//https://reactrouter.com/web/api

import { Navbar, NotFoundPage } from "./app/register"
import { AllLearnersPage, LearnersPanel } from "./features/learners/register"
import { ScheduleUploader } from "./features/schedules/register"

function App() {
  const links = [
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
          <Route exact path="/learners" component={AllLearnersPage} />
          <Route exact path="/error" component={NotFoundPage} />
          <Route exact path="/schedules/new" component={ScheduleUploader} />
          <Route exact path="/testLearners" component={LearnersPanel} />
          {/* basicall 404 page, but need to register it */}
          <Redirect to="/error" />
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App
