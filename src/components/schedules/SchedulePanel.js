import React, { useState } from "react"
import { ScheduleCard } from "./ScheduleCard"
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

//this is more general
// function GridItem({ xs, sm, md, lg, xl, className, component, ...props }) {
//   const Component = component
//   return (
//     <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} className={className}>
//       <Component {...props} />
//     </Grid>
//   )
// }

//can also make a more general wrapper
function GridItemWrapper(Component, styleHook) {
  return function (props) {
    const classes = styleHook()
    return (
      <Grid item xs={8} sm={6} md={3} className={classes.item}>
        <Component {...props} />
      </Grid>
    )
  }
}

const CustomScheduleCard = GridItemWrapper(ScheduleCard, useStyles)

export function SchedulePanel() {
  function onEditScheduleClicked(e) {
    //need to use currentTarget since it's a material icon component so need to get the reference to the underlying base DOM element
    console.log(e.currentTarget.getAttribute("scheduleId"))
  }

  const data = [
    {
      scheduleId: 1,
      scheduleName: "test",
      weekCount: 2,
    },
    {
      scheduleId: 2,
      scheduleName: "test",
      weekCount: 2,
    },
    {
      scheduleId: 3,
      scheduleName: "test",
      weekCount: 2,
    },
  ]

  const [schedules, setSchedules] = useState(data)

  const scheduleCards = schedules.map(
    ({ scheduleId, scheduleName, weekCount }) => {
      return (
        <CustomScheduleCard
          key={scheduleId}
          scheduleId={scheduleId}
          scheduleName={scheduleName}
          weekCount={weekCount}
          onEditScheduleClicked={onEditScheduleClicked}
        />
      )
    }
  )

  const classes = useStyles()

  return (
    <Grid container className={classes.container}>
      {scheduleCards}
    </Grid>
  )
}
