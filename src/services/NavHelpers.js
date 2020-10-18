export class NavHelpers {
  static setCurrentPage() {
    let currentPage = window.location.href.split("/").splice(-1)

    currentPage = currentPage === "/instructor" ? "schedules" : currentPage

    sessionStorage.setItem("currentPage", `/instructor/${currentPage}`)
  }

  static getCurrentPage() {
    let currentPage = sessionStorage.getItem("currentPage")
    return currentPage === "/instructor/"
      ? "/instructor/schedules"
      : currentPage
  }

  static clearCurrentPage() {
    return sessionStorage.removeItem("currentPage")
  }
}
