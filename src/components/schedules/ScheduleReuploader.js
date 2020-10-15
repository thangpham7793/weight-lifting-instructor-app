import React from "react"
import { myExcelReader } from "./myExcelReader"
import { FileUploader } from "./register"
import { Grid } from "@material-ui/core"

//a good candidate for Redux, since needed by many components, lets just do useState for now
export function ScheduleReuploader({ scheduleId }) {
  function onFileUploaded(e) {
    const selectedFile = e.target.files[0]
    const r = new myExcelReader([], "", false, scheduleId)
    //empty rows are skipped!
    //this is async (oneload and onerror are defined inside the r instance)
    r.reader.readAsArrayBufferPromise(selectedFile)
    console.log(`Reupload schedule ${scheduleId}`)
  }

  return (
    <Grid
      container
      xs={8}
      md={12}
      lg={12}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <FileUploader onFileUploaded={onFileUploaded} />
    </Grid>
  )
}
