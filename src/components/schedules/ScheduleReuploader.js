import React, { useState } from "react"
import { FileUploader, ScheduleNameInput } from "./register"
import { Grid } from "@material-ui/core"
import { ActionNotificationDiv } from "../ActionNotificationDiv"
//a good candidate for Redux, since needed by many components, lets just do useState for now
//snackBar good candidate for a factory function

export function ScheduleReuploader({
  onClickedScheduleNameChanged,
  onFileUploaded,
  scheduleName,
  isFileUploaded,
}) {
  const [actionStatus, setActionStatus] = useState({
    action: null,
    isActionSuccess: isFileUploaded,
  })

  function onCloseActionStatusDiv() {
    setActionStatus({ action: null, isActionSuccess: null })
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
        onClickedScheduleNameChanged={onClickedScheduleNameChanged}
        scheduleName={scheduleName}
      />

      {/* this needs special styling and its state needs to be hoisted */}
      <ActionNotificationDiv
        actionStatus={actionStatus}
        onCloseActionStatusDiv={onCloseActionStatusDiv}
      />

      {scheduleName.length > 0 ? (
        <FileUploader onFileUploaded={onFileUploaded} />
      ) : (
        "Schedule Name Must Not Be Empty"
      )}
    </Grid>
  )
}
