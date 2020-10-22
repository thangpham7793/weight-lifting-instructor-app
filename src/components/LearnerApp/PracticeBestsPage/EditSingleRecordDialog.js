import React from "react"
import { useSelector } from "react-redux"
import { Dialog, DialogContent } from "@material-ui/core"
import { quickStyles } from "../../../services/register"
import { Button, Typography } from "@material-ui/core"
import { Save } from "@material-ui/icons"

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
  clickedPbId,
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
      width: "100vw",
      height: "100%",
    },
    saveBtn: {
      display: "flex",
      justifyContent: "space-evenly",
      fontSize: "0.65rem",
      maxWidth: "max-content",
    },
    saveBtnLabel: {
      fontSize: "0.75rem",
    },
  })

  return (
    <Dialog
      fullScreen={true}
      open={open}
      aria-labelledby="form-dialog-title"
      className={classes.dialog}
    >
      <DialogContent className={classes.content}>
        <SaveButton
          onClick={onDialogCloseClicked}
          label="Save"
          classes={classes}
        />
      </DialogContent>
    </Dialog>
  )
}
