import React from "react"
import { Dialog, DialogContent } from "@material-ui/core"
import { quickStyles } from "../../services/register"
import { Button, Typography, Grid } from "@material-ui/core"
import { Save, Close } from "@material-ui/icons"
import { LearnerSignUpForm } from "./register"

function FormButton({ onClick, classes, label, icon, disabled }) {
  const Icon = icon

  return (
    <Button
      variant="contained"
      color="secondary"
      name={label}
      onClick={onClick}
      className={classes.formBtn}
      disabled={disabled}
    >
      <Typography variant="button" className={classes.formBtnLabel}>
        {label}
      </Typography>
      <Icon fontSize="small" />
    </Button>
  )
}

export function LearnerSignUpDialog({
  open,
  onLearnerInputChanged,
  tempLearner,
  isInputValid,
  onSignUpDialogClosed,
  programmes,
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
        <LearnerSignUpForm
          isInputValid={isInputValid}
          onLearnerInputChanged={onLearnerInputChanged}
          tempLearner={tempLearner}
          programmes={programmes}
          buttons={
            <Grid container wrap="nowrap" justify="space-between">
              <FormButton
                onClick={onSignUpDialogClosed}
                label="Close"
                classes={classes}
                icon={Close}
              />
              <FormButton
                onClick={onSignUpDialogClosed}
                label="Submit"
                classes={classes}
                icon={Save}
                disabled={Object.values(isInputValid).some((i) => i === false)}
              />
            </Grid>
          }
        />
      </DialogContent>
    </Dialog>
  )
}
