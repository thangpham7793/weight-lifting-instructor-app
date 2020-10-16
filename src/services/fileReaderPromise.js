export function fileReaderPromise(file) {
  return new Promise((resolve, reject) => {
    let r = new FileReader()
    r.onload = (e) => resolve(e.target.result)
    r.onerror = reject
    r.readAsArrayBuffer(file)
  })
}
