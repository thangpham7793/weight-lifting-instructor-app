import React from "react"
import { ScheduleOptions, WeekOptions } from "./register"
import { Grid, Typography, Button } from "@material-ui/core"
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
        <Button
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
            margin: "1rem auto",
            padding: "0.5rem",
            background: "var(--txt-cl)",
            fontSize: "1rem",
          }}
          variant="contained"
          onClick={onScheduleSubmitted}
        >
          <Typography variant="button" style={{ fontSize: "0.75rem" }}>
            Let's Go
          </Typography>
        </Button>
      </Grid>
    </Grid>
  )
}
