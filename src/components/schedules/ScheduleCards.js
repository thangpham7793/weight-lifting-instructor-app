import React from "react"
import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { ScheduleCard } from "./register"

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: "space-around",
  },
  item: {
    margin: "var(--mg-sm)",
    padding: 0,
  },
}))

//can also make a more general wrapper
function GridItemWrapper(Component, styleHook) {
  return (props) => {
    const classes = styleHook()
    return (
      <Grid item xs={8} sm={6} md={3} className={classes.item}>
        <Component {...props} />
      </Grid>
    )
  }
}

function CustomScheduleCard(props) {
  return GridItemWrapper(ScheduleCard, useStyles)(props)
}

export function ScheduleCards({ schedules, ...props }) {
  const cards = schedules
    ? schedules.map(({ scheduleId, scheduleName, weekCount, programmes }) => {
        return (
          <CustomScheduleCard
            key={scheduleId}
            scheduleId={scheduleId}
            scheduleName={scheduleName}
            weekCount={weekCount}
            programmes={programmes}
            {...props}
          />
        )
      })
    : null

  return <>{cards}</>
}
