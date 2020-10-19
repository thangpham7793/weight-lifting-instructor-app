import React from "react"
// import { ProtectedRoute } from "./register"
import { Route, Redirect, Switch } from "react-router-dom"
import { NavHelpers } from "../services/register"

//isProtected ? <ProtectedRoute {...props} /> :

// function PageRoute({ isProtected, ...props }) {
//   return <Route {...props} />
// }

export function PageRoutes({ links }) {
  const routes = links.map(({ to, component }) => {
    return <Route key={to} exact path={to} component={component} />
  })

  return (
    <Switch>
      {routes}
      <Redirect
        to={
          NavHelpers.getCurrentPage()
            ? NavHelpers.getCurrentPage()
            : "/learner/login"
        }
      />
    </Switch>
  )
}
