import React from "react"
import { Fab } from "@material-ui/core"
import { CloudUpload } from "@material-ui/icons"

export function AddScheduleFloatingButton() {
  return (
    <Fab
      variant="extended"
      aria-label="add"
      style={{ position: "absolute", left: "5%", top: "13.5%" }}
    >
      <CloudUpload />
      <span
        style={{ textAlign: "center" }}
        className="add-schedule-btn-wrapper"
      >
        New Cycle
      </span>
    </Fab>
  )
}
