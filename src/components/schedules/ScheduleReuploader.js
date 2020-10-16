import React from "react"
import { FileUploader } from "./register"
import { Grid } from "@material-ui/core"
import { fileReaderPromise, makeSchedulePayload } from "../../services/register"
import httpService from "../../services/ProgrammeServiceSingleton"

//a good candidate for Redux, since needed by many components, lets just do useState for now
export function ScheduleReuploader({ scheduleId }) {
  async function onFileUploaded(e) {
    const selectedFile = e.target.files[0]
    const buffer = await fileReaderPromise(selectedFile)
    const payload = makeSchedulePayload(buffer, [], "", scheduleId, false)
    const isUpdated = await httpService.repostSchedule(payload)
    if (isUpdated) {
      console.log("Update Successful!")
      return
    }
    console.log("Update failed!")
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
