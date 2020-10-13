import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
//https://reactrouter.com/web/api

import { Navbar, NotFoundPage, Footer, ProtectedRoute } from "./app/register"

import { LearnersPanel } from "./components/learners/register"
import { ScheduleUploader } from "./components/schedules/register"
import { HomePanel } from "./components/home/register"

function App() {
  const links = [
    {
      to: "/instructor",
      label: "Home Panel",
    },
    {
      to: "/instructor/learners",
      label: "Learners Panel",
    },
    {
      to: "/instructor/schedules",
      label: "Schedules",
    },
    {
      to: "/instructor/schedules/new",
      label: "Upload Schedule",
    },
  ]

  return (
    <Router>
      <Navbar links={links} />
      <div className="App main">
        {/* Switch ensure that only one component is rendered at a time You also register all your routes here! */}
        <Switch>
          <Route exact path="/instructor/login" component={HomePanel} />
          <ProtectedRoute
            exact
            path="/instructor/schedules/new"
            component={ScheduleUploader}
          />
          <ProtectedRoute
            exact
            path="/instructor/learners"
            component={LearnersPanel}
          />
          <Route exact path="/instructor/error" component={NotFoundPage} />
          {/* basically a 404 page, but need to register it */}
          <Redirect to="/instructor/login" />
        </Switch>
      </div>
      <Footer />
    </Router>
  )
}

export default App
