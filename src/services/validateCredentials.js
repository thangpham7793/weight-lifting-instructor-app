import { repMaxrange } from "../utils"

export function isNotEmpty(str) {
  return str && str.trim().length > 0
}

export function isValidEmail(email) {
  const pattern = /^([\w_-]+|[\w_-]+(.[\w_-]+)+?)@([\w_-]+|[\w_-]+(.[\w_-]+)+?)$/
  return email && pattern.test(email)
}

export function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

export function validateInstructorCredentials({ email, password }) {
  if (isNotEmpty(email) && isNotEmpty(password)) {
    return isValidEmail(email) ? null : "Invalid email"
  } else {
    return "Missing Email or Password"
  }
}

export function validateLearnerCredentials({ username, password }) {
  return isNotEmpty(username) && isNotEmpty(password)
    ? null
    : "Missing Email or Password"
}

export function validateNewWeight(weight) {
  return isNotEmpty(weight) && isNumber(weight) && parseFloat(weight) > 0
}

export function validateNewRepMax(repMax) {
  return repMaxrange(10).includes(repMax)
}

export function validateNewPb(pb) {
  return isNumber(pb) && parseFloat(pb) >= 0
}
