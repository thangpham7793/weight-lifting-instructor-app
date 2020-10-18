function isNotEmpty(str) {
  return str && str.trim().length > 0
}

function isValidEmail(email) {
  const pattern = /^([\w_-]+|[\w_-]+(.[\w_-]+)+?)@([\w_-]+|[\w_-]+(.[\w_-]+)+?)$/
  return email && pattern.test(email)
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
