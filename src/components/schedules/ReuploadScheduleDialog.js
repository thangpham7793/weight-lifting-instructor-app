import React from "react"
import { ScheduleReuploader } from "../schedules/register"
import { useActionSnackbar } from "../../hooks/register"
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Typography,
} from "@material-ui/core"
import httpService from "../../services/ProgrammeServiceSingleton"
import { makeSchedulePayload } from "../../services/register"

export function ReuploadScheduleDialog({
  onDialogCloseClicked,
  open,
  clickedSchedule,
  onClickedScheduleNameChanged,
  currentClickedScheduleName,
  onActionSuccess,
  canUpdate,
  fileUploaded,
  onFileUploaded,
  buffer,
  ...props
}) {
  const { callDecoratedRepostService, RepostSnackbar } = useActionSnackbar(
    "repost",
    httpService.repostSchedule
  )

  async function onSaveUpdateClicked() {
    const data = makeSchedulePayload(
      buffer,
      [],
      clickedSchedule.scheduleName,
      false,
      clickedSchedule.scheduleId
    )

    const { ok, payload } = await callDecoratedRepostService([data])
    if (ok) {
      //don't need timetable to update UI
      delete data.timetable
      onActionSuccess("repost", data)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onDialogCloseClicked}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle
        style={{
          backgroundColor: "var(--txt-cl)",
        }}
      >
        <Typography style={{ fontWeight: "var(--fw-md)" }}>
          Reupload Cycle
        </Typography>
      </DialogTitle>
      <DialogContent className="add-new-schedule-dialog">
        <RepostSnackbar />
        {clickedSchedule && (
          <ScheduleReuploader
            {...props}
            onClickedScheduleNameChanged={onClickedScheduleNameChanged}
            onFileUploaded={onFileUploaded}
            scheduleName={clickedSchedule.scheduleName}
            fileUploaded={fileUploaded}
          />
        )}
      </DialogContent>
      <DialogActions
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          padding: "0",
          backgroundColor: "var(--txt-cl)",
        }}
      >
        <button
          disabled={!canUpdate}
          onClick={onSaveUpdateClicked}
          style={{ width: "max-content" }}
        >
          Save
        </button>
        <button onClick={onDialogCloseClicked} style={{ width: "max-content" }}>
          Close
        </button>
      </DialogActions>
    </Dialog>
  )
}
