import React from "react"
import { ScheduleUploader } from "../schedules/register"
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
} from "@material-ui/core"

export function AddScheduleFormDialog({ handleClose, open }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogContent className="add-new-schedule-dialog">
        <ScheduleUploader />
      </DialogContent>
      <DialogActions>
        <button onClick={handleClose}>Cancel</button>
      </DialogActions>
    </Dialog>
  )
}
