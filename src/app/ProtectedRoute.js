import React from "react"
import { Redirect } from "react-router-dom"
import { UserAuth } from "../services/auth"

export function ProtectedRoute({ component }) {
  const Component = component
  console.log("Checking", UserAuth.isAuthenticated())
  return UserAuth.isAuthenticated() ? <Component /> : <Redirect to="/" />
}
