export class NavHelpers {
  static setCurrentPage(page) {
    if (page) {
      sessionStorage.setItem("currentPage", page)
      return
    }
  }

  static getCurrentPage() {
    let currentPage = sessionStorage.getItem("currentPage")
    //redirects from login page if authenticated
    if (currentPage === "/instructor") {
      return "/instructor/schedules"
    }
    if (currentPage === "/learner") {
      return "/learner/schedules"
    } else {
      return currentPage
    }
  }

  static clearCurrentPage() {
    return sessionStorage.removeItem("currentPage")
  }
}
