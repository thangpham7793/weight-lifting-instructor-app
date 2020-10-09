import React from "react"

export function FileUploader({ onFileUploaded }) {
  return (
    <div>
      <input
        type="file"
        id="fileUploader"
        name="fileUploader"
        accept=".xls, .xlsx"
        onChange={onFileUploaded}
      />
      <pre id="jsonObject"> JSON : </pre>
    </div>
  )
}
