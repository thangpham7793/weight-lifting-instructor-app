import React from "react"
import { Dialog, DialogContent } from "@material-ui/core"
import { quickStyles } from "../../../services/register"
import { Button, Typography } from "@material-ui/core"
import { Save } from "@material-ui/icons"
import { SingleRecordForm } from "./SingleRecordForm"

function SaveButton({ onClick, classes, label }) {
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={onClick}
      className={classes.saveBtn}
    >
      <Typography variant="button" className={classes.saveBtnLabel}>
        {label}
      </Typography>
      <Save fontSize="small" />
    </Button>
  )
}

export default function EditSingleRecordDialog({
  open,
  onDialogCloseClicked,
  onRecordInputChange,
  tempRecord,
}) {
  const classes = quickStyles({
    dialog: {
      width: "90vw",
      height: "90%",
      margin: "1rem auto",
    },
    content: {
      background: "var(--txt-cl)",
      paddingTop: "0",
    },
    form: {
      margin: "11% auto var(--mg-sm)",
      width: "100%",
      height: "100%",
    },
    saveBtn: {
      display: "flex",
      justifyContent: "space-evenly",
      fontSize: "0.65rem",
      maxWidth: "100%",
      margin: "1rem auto",
    },
    saveBtnLabel: {
      fontSize: "0.75rem",
    },
    paperScrollPaper: {
      width: "90%",
      maxWidth: "600px",
      height: "max-content",
    },
  })

  return (
    <Dialog
      open={open}
      aria-labelledby="form-dialog-title"
      className={classes.dialog}
      classes={{ paperScrollPaper: classes.paperScrollPaper }}
    >
      <DialogContent className={classes.content}>
        <SingleRecordForm
          onRecordInputChange={onRecordInputChange}
          record={tempRecord}
          saveBtn={
            <SaveButton
              onClick={onDialogCloseClicked}
              label="Save"
              classes={classes}
            />
          }
        />
      </DialogContent>
    </Dialog>
  )
}
