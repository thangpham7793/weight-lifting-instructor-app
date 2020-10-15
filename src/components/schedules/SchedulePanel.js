import React, { useState, useEffect } from "react"
import { ScheduleCards } from "./register"
import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { FetchNotificationDivFactory } from "../factoryComponent"
import { ActionNotificationDiv } from "../ActionNotificationDiv"

import httpService from "../../services/ProgrammeServiceSingleton"

const FetchScheduleNotificationDiv = FetchNotificationDivFactory("schedules")
const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: "space-around",
    marginTop: "var(--mg-sm)",
  },
  item: {
    margin: "var(--mg-sm)",
    padding: 0,
  },
}))

export function SchedulePanel() {
  const [schedules, setSchedules] = useState(null)
  const [isFetchSucccess, setIsFetchSuccess] = useState(null)
  const [actionStatus, setActionStatus] = useState({
    action: null,
    isActionSuccess: true,
  })

  function onEditScheduleClicked(e) {
    //need to use currentTarget since it's a material icon component so need to get the reference to the underlying base DOM element
    console.log(e.currentTarget.getAttribute("scheduleId"))
  }

  async function onDeleteScheduleClicked(e) {
    const clickedSchedudleId = e.currentTarget.getAttribute("scheduleId")

    if (
      window.confirm(
        `Are you sure you want to delete schedule id ${clickedSchedudleId}`
      )
    ) {
      setActionStatus({ action: "delete", isActionSuccess: null })
      console.log(`Delete schedule id ${clickedSchedudleId}}`)
      const isDeleted = await httpService.deleteSchedule(clickedSchedudleId)
      if (isDeleted) {
        setActionStatus({ action: "delete", isActionSuccess: true })
      } else {
        setActionStatus({ action: "delete", isActionSuccess: false })
        setSchedules(updateSchedulesList(schedules, clickedSchedudleId))
      }
    }
  }

  function updateSchedulesList(schedules, clickedSchedudleId) {
    return schedules.filter(
      ({ scheduleId }) => scheduleId !== clickedSchedudleId
    )
  }

  function onPublishScheduleClicked(e) {
    console.log(
      `Publish schedule id ${e.currentTarget.getAttribute("scheduleId")}`
    )
  }

  function onCloseActionStatusDiv(e) {
    setActionStatus({ action: null, isActionSuccess: null })
  }

  useEffect(() => {
    async function fetchSchedules() {
      const res = await httpService.fetchScheduleInfo()
      if (res) {
        setIsFetchSuccess(true)
        setSchedules(res)
      }
      setIsFetchSuccess(false)
    }
    fetchSchedules()
  }, [])

  const classes = useStyles()

  return (
    <>
      <ActionNotificationDiv
        actionStatus={actionStatus}
        onCloseActionStatusDiv={onCloseActionStatusDiv}
      />
      <Grid container className={classes.container}>
        {!schedules ? (
          <FetchScheduleNotificationDiv
            isFetchSuccess={isFetchSucccess}
            style={{ margin: "5% auto" }}
          />
        ) : (
          <ScheduleCards
            schedules={schedules}
            onEditScheduleClicked={onEditScheduleClicked}
            onPublishScheduleClicked={onPublishScheduleClicked}
            onDeleteScheduleClicked={onDeleteScheduleClicked}
          />
        )}
      </Grid>
    </>
  )
}
