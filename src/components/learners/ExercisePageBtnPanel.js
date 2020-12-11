import React from "react"
import { Grid, Button } from "@material-ui/core"
import { LinkButton } from "../factoryComponent"

export function ExercisePageBtnPanel({
  classes,
  onPbsDialogOpenClicked,
  onFeedbackDialogOpenClicked,
}) {
  return (
    <Grid
      item
      container
      justify="space-between"
      wrap="nowrap"
      style={{
        margin: "1rem auto",
        width: "100%",
        padding: "0 0.25rem",
        flexBasis: "auto",
      }}
    >
      <Grid item className={classes.btnWrapper}>
        <LinkButton
          variant="contained"
          color="primary"
          className={classes.btn}
          to="/learner/schedules"
          label="Back"
        />
      </Grid>
      <Grid item className={classes.btnWrapper}>
        <Button
          variant="contained"
          color="primary"
          className={classes.btn}
          onClick={onPbsDialogOpenClicked}
        >
          Edit PBs
        </Button>
      </Grid>
      <Grid item className={classes.btnWrapper}>
        <Button
          variant="contained"
          color="primary"
          className={classes.btn}
          onClick={onFeedbackDialogOpenClicked}
        >
          Feedback
        </Button>
      </Grid>
    </Grid>
  )
}
