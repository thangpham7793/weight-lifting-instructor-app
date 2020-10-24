import React from "react"
import { Dialog, DialogContent } from "@material-ui/core"
import { quickStyles } from "../../../services/register"
import { Grid } from "@material-ui/core"
import { Save, Close, Delete } from "@material-ui/icons"
import { SingleRecordForm } from "./SingleRecordForm"
import { FormButton } from "./FormButton"

export default function EditSingleRecordDialog({
  open,
  onRecordInputChange,
  record,
  isInputValid,
  onDialogCloseClicked,
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
    formBtn: {
      display: "flex",
      justifyContent: "space-evenly",
      maxWidth: "30%",
      margin: "1rem auto",
    },
    formBtnLabel: {
      fontSize: "0.4rem",
    },
    paperScrollPaper: {
      width: "100%",
      maxWidth: "600px",
      height: "max-content",
      margin: "0",
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
          isInputValid={isInputValid}
          onRecordInputChange={onRecordInputChange}
          record={record}
          buttons={
            <Grid container wrap="nowrap" justify="space-between">
              <FormButton
                onClick={onDialogCloseClicked}
                label="Close"
                classes={classes}
                icon={Close}
              />
              <FormButton
                onClick={onDialogCloseClicked}
                label="Save"
                classes={classes}
                icon={Save}
                disabled={Object.values(isInputValid).some((i) => i === false)}
              />
              {record.pbId && (
                <FormButton
                  onClick={onDialogCloseClicked}
                  label="Delete"
                  classes={classes}
                  icon={Delete}
                />
              )}
            </Grid>
          }
        />
      </DialogContent>
    </Dialog>
  )
}
