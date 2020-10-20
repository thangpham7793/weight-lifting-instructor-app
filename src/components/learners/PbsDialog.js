import React from "react"
import { LearnerPbsForm } from "./register"
import { Dialog, DialogContent } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() => ({
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
}))

export function PbsDialog({
  onDialogCloseClicked,
  onPersonalBestsInputChange,
  pbs,
  open,
}) {
  const classes = useStyles()

  return (
    <Dialog
      fullScreen={true}
      open={open}
      onClose={onDialogCloseClicked}
      aria-labelledby="form-dialog-title"
      className={classes.dialog}
    >
      <DialogContent className={classes.content}>
        <LearnerPbsForm
          pbs={pbs}
          onPersonalBestsInputChange={onPersonalBestsInputChange}
          onDialogCloseClicked={onDialogCloseClicked}
        />
      </DialogContent>
    </Dialog>
  )
}
