import React from "react"
import { ScheduleReuploader } from "../schedules/register"
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Typography,
} from "@material-ui/core"

export function ReuploadScheduleDialog({
  scheduleId,
  onDialogCloseClicked,
  open,
}) {
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
        <ScheduleReuploader scheduleId={scheduleId} />
      </DialogContent>
      <DialogActions
        style={{
          justifyContent: "center",
          padding: "0",
          backgroundColor: "var(--txt-cl)",
        }}
      >
        <button onClick={onDialogCloseClicked} style={{ width: "max-content" }}>
          Close
        </button>
      </DialogActions>
    </Dialog>
  )
}
