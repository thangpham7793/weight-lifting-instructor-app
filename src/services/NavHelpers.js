export class NavHelpers {
  static currentApp = ""

  static setCurrentPage() {
    let currentPage = window.location.href.split("/").splice(-1)

    currentPage = currentPage === "/instructor" ? "schedules" : currentPage

    sessionStorage.setItem(
      "currentPage",
      `${NavHelpers.currentApp}/${currentPage}`
    )
  }

  static getCurrentPage() {
    let currentPage = sessionStorage.getItem("currentPage")
    if (currentPage === "/instructor/") {
      return "/instructor/schedules"
    }
    if (currentPage === "/learner/") {
      return "/learnerr/schedules"
    } else {
      return currentPage
    }
  }

  static clearCurrentPage() {
    return sessionStorage.removeItem("currentPage")
  }
}
