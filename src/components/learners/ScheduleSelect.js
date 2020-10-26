import React from "react"
import { ScheduleOptions, WeekOptions } from "./register"
import { Grid, Typography, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { BackButton } from "../LearnerApp/PracticeBestsPage/BackButton"
import { ArrowForward } from "@material-ui/icons"

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
  btn: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "max-content",
    margin: "1rem auto",
    background: "var(--txt-cl)",
  },
  btnLabel: {
    fontSize: "0.5rem",
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
        xs={10}
        md={6}
        lg={4}
        className={classes.itemWrapper}
        style={{ background: "var(--txt-cl)", boxShadow: "var(--bsd-sm)" }}
      >
        <ScheduleOptions
          schedules={schedules}
          onScheduleChecked={onScheduleChecked}
          label="Available Cycles"
          selectedSchedule={selectedSchedule}
        />
        <WeekOptions
          onWeekSelected={onWeekSelected}
          weekCount={selectedSchedule.weekCount}
          label="Week"
          selectedWeek={selectedWeek}
        />
      </Grid>
      <Grid
        item
        xs={9}
        sm={6}
        md={4}
        lg={3}
        container
        wrap="nowrap"
        className={classes.itemWrapper}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <BackButton
          to="/learner/practice.bests"
          label="To PBs"
          style={{ padding: "1rem 0" }}
        />
        <Grid container item justify="center" style={{ padding: "0" }}>
          <Button
            className={classes.btn}
            variant="contained"
            onClick={onScheduleSubmitted}
          >
            <Typography variant="button" className={classes.btnLabel}>
              Let's Go
            </Typography>
            <ArrowForward fontSize="small" />
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
