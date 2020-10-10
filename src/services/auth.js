export class UserAuth {
  static isAuthenticated() {
    return sessionStorage.getItem("token") !== null
  }

  static saveToken(token) {
    sessionStorage.setItem("token", token)
  }

  static getToken() {
    return sessionStorage.getItem("token")
  }

  static clearToken() {
    sessionStorage.removeItem("token")
  }
}
