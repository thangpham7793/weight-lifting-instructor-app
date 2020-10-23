import React from "react"
import { Fab } from "@material-ui/core"
import { Add } from "@material-ui/icons"
import EditSingleRecordDialog from "./EditSingleRecordDialog"

export function AddRecordFloatingButton({
  onAddNewRecordBtnClicked,
  ...props
}) {
  //const NewRecordDialog = dialog

  return (
    <>
      <Fab
        onClick={onAddNewRecordBtnClicked}
        aria-label="add"
        style={{
          position: "fixed",
          right: "7%",
          bottom: "7%",
          zIndex: 3,
          background: "var(--txt-cl)",
        }}
        id="add-new-pb-btn"
      >
        <Add />
      </Fab>
      <EditSingleRecordDialog {...props} />
    </>
  )
}
