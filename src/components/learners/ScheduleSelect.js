import React from "react"
import { ScheduleOptions, WeekOptions } from "./register"
import { Grid, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() => ({
  wrapper: {
    margin: "0 auto",
    display: "flex",
    alignContent: "space-around",
    height: "100%",
    flexDirection: "column",
    flexWrap: "nowrap",
  },
  itemWrapper: {
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignContent: "space-around",
    justifyContent: "center",
  },
  header: {
    fontWeight: "var(--fw-md)",
    fontSize: "1.25rem",
  },
}))

export function ScheduleSelect({
  selectedSchedule,
  schedules,
  onScheduleChecked,
  onScheduleSubmitted,
  selectedWeek,
  onWeekSelected,
}) {
  const classes = useStyles()

  return (
    <Grid container className={classes.wrapper}>
      <Grid item xs={8} md={6} lg={4} className={classes.itemWrapper}>
        <Typography component="header" className={classes.header}>
          {selectedSchedule.programmeName}
        </Typography>
      </Grid>
      <Grid
        item
        xs={8}
        md={6}
        lg={4}
        className={classes.itemWrapper}
        style={{ background: "var(--txt-cl)" }}
      >
        <ScheduleOptions
          schedules={schedules}
          onScheduleChecked={onScheduleChecked}
          label="Available Cycles"
          selectedSchedule={selectedSchedule}
        />
        <WeekOptions
          onWeekSelected={onWeekSelected}
          selectedSchedule={selectedSchedule}
          label="Week"
          selectedWeek={selectedWeek}
        />
      </Grid>
      <Grid item xs={8} md={6} lg={4} className={classes.itemWrapper}>
        <button
          className={`submit-btn`}
          style={{ width: "100%", margin: "1rem", alignSelf: "center" }}
          onClick={onScheduleSubmitted}
        >
          Let's Go!
        </button>
      </Grid>
    </Grid>
  )
}
