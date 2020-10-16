import React, { useState, useEffect } from "react"
import {
  ScheduleCards,
  AddScheduleFloatingButton,
  ReuploadScheduleDialog,
  PublishScheduleDialog,
} from "./register"
import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { FetchNotificationDivFactory } from "../factoryComponent"
import { ActionNotificationDiv } from "../ActionNotificationDiv"

import httpService from "../../services/ProgrammeServiceSingleton"

const FetchScheduleNotificationDiv = FetchNotificationDivFactory("schedules")
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
  const [schedules, setSchedules] = useState(null)
  const [isFetchSucccess, setIsFetchSuccess] = useState(null)

  const [clickedScheduleId, setClickedScheduleId] = useState(null)
  const [openReuploadDialog, setOpenReuploadDialog] = useState(false)
  const [openPublishDialog, setOpenPublishDialog] = useState(false)

  const [actionStatus, setActionStatus] = useState({
    action: null,
    isActionSuccess: true,
  })

  function getClickedScheduleId(e) {
    return parseInt(e.currentTarget.getAttribute("scheduleId"))
  }

  function onEditScheduleClicked(e) {
    //need to use currentTarget since it's a material icon component so need to get the reference to the underlying base DOM element
    console.log(e.currentTarget.getAttribute("scheduleId"))
    setOpenReuploadDialog(true)
    setClickedScheduleId(getClickedScheduleId(e))
  }

  //shared by all dialogs since only one can be opened at the same time
  function onDialogCloseClicked(e) {
    setOpenReuploadDialog(false)
    setOpenPublishDialog(false)
    // window.reload()
  }

  async function onDeleteScheduleClicked(e) {
    const clickedSchedudleId = getClickedScheduleId(e)

    if (
      window.confirm(
        `Are you sure you want to delete schedule id ${clickedSchedudleId}`
      )
    ) {
      setActionStatus({ action: "delete", isActionSuccess: null })
      console.log(`Delete schedule id ${clickedSchedudleId}`)
      const isDeleted = await httpService.deleteSchedule(clickedSchedudleId)
      if (isDeleted) {
        setActionStatus({ action: "delete", isActionSuccess: true })
        setSchedules(
          updateSchedulesList("delete", schedules, clickedSchedudleId)
        )
      } else {
        setActionStatus({ action: "delete", isActionSuccess: false })
      }
    }
  }

  function updateSchedulesList(action, schedules, clickedSchedudleId) {
    switch (action) {
      case "delete":
        return schedules.filter(
          ({ scheduleId }) => scheduleId !== clickedSchedudleId
        )
      default:
        return schedules
    }
  }

  function onPublishScheduleClicked(e) {
    console.log(
      `Publish schedule id ${e.currentTarget.getAttribute("scheduleId")}`
    )
    setOpenPublishDialog(true)
    setClickedScheduleId(getClickedScheduleId(e))
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
      <AddScheduleFloatingButton />
      <Grid container className={classes.container}>
        {!schedules ? (
          <FetchScheduleNotificationDiv
            isFetchSuccess={isFetchSucccess}
            style={{ margin: "0 auto" }}
          />
        ) : (
          <>
            <ScheduleCards
              schedules={schedules}
              onEditScheduleClicked={onEditScheduleClicked}
              onPublishScheduleClicked={onPublishScheduleClicked}
              onDeleteScheduleClicked={onDeleteScheduleClicked}
            />
          </>
        )}
      </Grid>
      <ReuploadScheduleDialog
        open={openReuploadDialog}
        onDialogCloseClicked={onDialogCloseClicked}
        scheduleId={clickedScheduleId}
      />
      <PublishScheduleDialog
        open={openPublishDialog}
        onDialogCloseClicked={onDialogCloseClicked}
        scheduleId={clickedScheduleId}
      />
    </>
  )
}
