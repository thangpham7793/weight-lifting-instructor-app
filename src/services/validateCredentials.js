function isNotEmpty(str) {
  return str.trim().length > 0
}

function isValidEmail(email) {
  const pattern = /^([\w_-]+|[\w_-]+(.[\w_-]+)+?)@([\w_-]+|[\w_-]+(.[\w_-]+)+?)$/
  return pattern.test(email)
}

export function validateCredentials({ email, password }) {
  if (isNotEmpty(email) && isNotEmpty(password)) {
    return isValidEmail(email) ? null : "Invalid email"
  } else {
    return "Missing Email or Password"
  }
}
