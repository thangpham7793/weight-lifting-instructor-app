import React from "react"
import { ProtectedRoute } from "./register"
import { Route, Redirect, Switch } from "react-router-dom"
import { NavHelpers } from "../services/register"

function PageRoute({ isProtected, ...props }) {
  return isProtected ? <ProtectedRoute {...props} /> : <Route {...props} />
}

export function PageRoutes({ links }) {
  const routes = links.map(({ to, component, isProtected }) => {
    return (
      <PageRoute
        key={to}
        exact
        path={to}
        component={component}
        isProtected={isProtected}
      />
    )
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
