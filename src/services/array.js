export function findIndexAndDelete(val, arr) {
  arr.splice(
    arr.findIndex((v) => v === val),
    1
  )
}
