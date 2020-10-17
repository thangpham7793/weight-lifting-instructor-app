import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
//https://reactrouter.com/web/api

import { Navbar, Footer, PageRoutes } from "./app/register"

import { LearnersPanel } from "./components/learners/register"
import {
  ScheduleUploader,
  SchedulePanel,
} from "./components/schedules/register"
import { HomePanel } from "./components/home/register"

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Montserrat", "sans-serif"],
  },
})

function App() {
  const links = [
    {
      to: "/instructor",
      label: "Home Panel",
      component: HomePanel,
      isProtected: false,
    },
    {
      to: "/instructor/learners",
      label: "Learners Panel",
      component: LearnersPanel,
      isProtected: true,
    },
    {
      to: "/instructor/schedules",
      label: "Schedules",
      component: SchedulePanel,
      isProtected: true,
    },
    {
      to: "/instructor/schedules/new",
      label: "Upload Schedule",
      component: ScheduleUploader,
      isProtected: true,
    },
  ]

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar links={links} />
        <div className="App main">
          <PageRoutes links={links} />
        </div>
        <Footer />
      </Router>
    </ThemeProvider>
  )
}

export default App
