import React from "react"
import { ScheduleUploader } from "../schedules/register"
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
} from "@material-ui/core"
import { useActionSnackbar } from "../../hooks/register"
import httpService from "../../services/ProgrammeServiceSingleton"

export function AddScheduleFormDialog({ handleClose, open, onActionSuccess }) {
  const { callDecoratedUploadService, UploadSnackbar } = useActionSnackbar(
    "upload",
    httpService.postNewSchedule
  )

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          style={{
            backgroundColor: "var(--txt-cl)",
          }}
        >
          <Typography style={{ fontWeight: "var(--fw-md)" }}>
            New Cycle
          </Typography>
        </DialogTitle>
        <DialogContent className="add-new-schedule-dialog">
          <ScheduleUploader
            onActionSuccess={onActionSuccess}
            callDecoratedUploadService={callDecoratedUploadService}
            uploadSnackbar={UploadSnackbar}
          />
        </DialogContent>
        <DialogActions
          style={{
            justifyContent: "center",
            padding: "1rem",
            backgroundColor: "var(--txt-cl)",
          }}
        >
          <Button
            variant="contained"
            onClick={handleClose}
            style={{
              width: "max-content",
              fontSize: "0.75rem",
              background: "inherit",
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <UploadSnackbar />
    </>
  )
}
