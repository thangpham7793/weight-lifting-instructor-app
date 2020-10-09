import React from 'react'
import { myExcelReader } from './myExcelReader'

export function ScheduleUploader() {
  function fileUploadHandler(evt) {
    const selectedFile = evt.target.files[0]
    const r = new myExcelReader()
    //empty rows are skipped!
    //this is async (oneload and onerror are defined inside the r instance)
    r.reader.readAsBinaryString(selectedFile)
  }

  return (
    <>
      <input
        type="file"
        id="fileUploader"
        name="fileUploader"
        accept=".xls, .xlsx"
        onChange={fileUploadHandler}
      />
      <pre id="jsonObject"> JSON : </pre>
    </>
  )
}
