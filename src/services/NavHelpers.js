export class NavHelpers {
  static setCurrentPage() {
    const currentPage = window.location.href.split("/").splice(-1)
    sessionStorage.setItem("currentPage", `/instructor/${currentPage}`)
  }

  static getCurrentPage() {
    return sessionStorage.getItem("currentPage")
  }

  static clearCurrentPage() {
    return sessionStorage.removeItem("currentPage")
  }
}
