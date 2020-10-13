import React from "react"
import ScheduleCard from "./ScheduleCard"
import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: "space-around",
  },
  item: {
    margin: "var(--mg-sm)",
    padding: 0,
  },
}))

export function SchedulePanel() {
  const classes = useStyles()

  return (
    <Grid container className={classes.container}>
      <Grid item xs={6} md={3} className={classes.item}>
        <ScheduleCard />
      </Grid>
      <Grid item xs={6} md={3} className={classes.item}>
        <ScheduleCard />
      </Grid>
      <Grid item xs={6} md={3} className={classes.item}>
        <ScheduleCard />
      </Grid>
    </Grid>
  )
}
