import React from "react"
import { Fab } from "@material-ui/core"
import { CloudUpload } from "@material-ui/icons"
import { AddScheduleFormDialog } from "./register"

export function AddScheduleFloatingButton({ onActionSuccess }) {
  const [open, setOpen] = React.useState(false)

  function onDialogOpenClicked() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }
  return (
    <>
      <Fab
        onClick={onDialogOpenClicked}
        variant="extended"
        aria-label="add"
        style={{ position: "fixed", right: "5%", bottom: "7%", zIndex: "5" }}
      >
        <CloudUpload />
        <span
          style={{ textAlign: "center" }}
          className="add-schedule-btn-wrapper"
        >
          New Cycle
        </span>
      </Fab>
      <AddScheduleFormDialog
        open={open}
        handleClose={handleClose}
        onActionSuccess={onActionSuccess}
      />
    </>
  )
}
