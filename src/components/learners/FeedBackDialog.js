import React from "react"
import { Dialog, DialogActions, DialogContent } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() => ({
  dialog: {
    width: "100vw",
    height: "100vh",
  },
  content: {
    background: "var(--secondary-cl)",
    paddingTop: "0",
  },
  form: {
    margin: "11% auto var(--mg-sm)",
    width: "100vw",
    height: "100vh",
  },
}))

export function FeedBackDialog({ onDialogCloseClicked, open }) {
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
        <iframe
          title="learner-feedback-form"
          style={{
            margin: "11% auto var(--mg-sm)",
            width: "90vw",
            height: "100vh",
          }}
          src="https://docs.google.com/forms/d/e/1FAIpQLSeBrxdCbRf1M0YvZVHp2n3taph7-pAS9mkbN99m2ZPeBrf0yQ/viewform?embedded=true"
        >
          Loading…
        </iframe>
      </DialogContent>
      <DialogActions
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          backgroundColor: "var(--txt-cl)",
        }}
      >
        <button onClick={onDialogCloseClicked} style={{ width: "max-content" }}>
          Close
        </button>
      </DialogActions>
    </Dialog>
  )
}
