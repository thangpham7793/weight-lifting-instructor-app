import React from "react"
import { Dialog, DialogActions, DialogContent } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() => ({
  dialog: {
    width: "90%",
    height: "90%",
    maxWidth: "600px",
    margin: "1rem auto",
  },
  content: {
    background: "var(--txt-cl)",
    paddingTop: "0",
  },
  form: {
    margin: "11% auto var(--mg-sm)",
    width: "100vw",
    height: "100vh",
  },
  container: {},
}))

export function FeedBackDialog({ onDialogCloseClicked, open, feedbackForm }) {
  const classes = useStyles()
  const FeedbackForm = feedbackForm

  return (
    <Dialog
      fullScreen={true}
      open={open}
      onClose={onDialogCloseClicked}
      aria-labelledby="form-dialog-title"
      className={classes.dialog}
    >
      <DialogContent className={classes.content}>
        {/* <iframe
          title="learner-feedback-form"
          style={{
            margin: "11% auto var(--mg-sm)",
            width: "90vw",
            height: "100vh",
          }}
          src="https://docs.google.com/forms/d/e/1FAIpQLSeBrxdCbRf1M0YvZVHp2n3taph7-pAS9mkbN99m2ZPeBrf0yQ/viewform?embedded=true"
        >
          Loading…
        </iframe> */}
        {/* http://stefano.brilli.me/google-forms-html-exporter/ */}
        <FeedbackForm />
      </DialogContent>
      {/* <DialogActions
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          backgroundColor: "var(--txt-cl)",
        }}
      >
        <button onClick={onDialogCloseClicked} style={{ width: "max-content" }}>
          Close
        </button>
      </DialogActions> */}
    </Dialog>
  )
}
