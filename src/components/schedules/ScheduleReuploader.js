import React, { useState } from "react"
import { FileUploader, ScheduleNameInput } from "./register"
import { ActionNotificationDiv } from "../ActionNotificationDiv"
import { Grid } from "@material-ui/core"
import { fileReaderPromise, makeSchedulePayload } from "../../services/register"
import httpService from "../../services/ProgrammeServiceSingleton"

//a good candidate for Redux, since needed by many components, lets just do useState for now

//snackBar good candidate for a factory function

export function ScheduleReuploader({
  scheduleId,
  clickedSchedule,
  onActionSuccess,
}) {
  const [scheduleName, setScheduleName] = useState(clickedSchedule.scheduleName)

  function onScheduleNameChanged(e) {
    setScheduleName(e.target.value)
  }

  const [actionStatus, setActionStatus] = useState({
    action: null,
    isActionSuccess: true,
  })

  function onCloseActionStatusDiv(e) {
    setActionStatus({ action: null, isActionSuccess: null })
  }

  async function onFileUploaded(e) {
    const selectedFile = e.target.files[0]
    const buffer = await fileReaderPromise(selectedFile)
    const data = makeSchedulePayload(
      buffer,
      [],
      scheduleName,
      false,
      scheduleId
    )

    setActionStatus({ action: "re-post", isActionSuccess: null })

    const { ok, payload } = await httpService.repostSchedule(data)
    if (ok) {
      setActionStatus({ action: "re-post", isActionSuccess: true })
      console.log("Update Successful!")

      //don't need timetable to update UI
      delete data.timetable

      onActionSuccess("repost", data)
      return
    }

    setActionStatus({ action: "re-post", isActionSuccess: false })
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
      <ScheduleNameInput
        label="Cycle Name"
        onScheduleNameChanged={onScheduleNameChanged}
        scheduleName={scheduleName}
      />
      <FileUploader onFileUploaded={onFileUploaded} />
      <ActionNotificationDiv
        actionStatus={actionStatus}
        onCloseActionStatusDiv={onCloseActionStatusDiv}
      />
    </Grid>
  )
}
