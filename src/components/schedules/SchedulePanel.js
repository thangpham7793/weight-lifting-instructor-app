import React, { useState, useEffect } from "react"
import {
  ScheduleCards,
  AddScheduleFloatingButton,
  ReuploadScheduleDialog,
  PublishScheduleDialog,
} from "./register"
import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { ActionNotificationDiv } from "../ActionNotificationDiv"
import { useActionSnackbar, useFetchSnackbar } from "../../hooks/register"
import httpService from "../../services/ProgrammeServiceSingleton"

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
  const [clickedScheduleId, setClickedScheduleId] = useState(null)
  const [openReuploadDialog, setOpenReuploadDialog] = useState(false)
  const [openPublishDialog, setOpenPublishDialog] = useState(false)

  const [
    isFetchSuccess,
    setIsFetchSuccess,
    FetchNotificationDiv,
  ] = useFetchSnackbar("schedules")

  const { callDecoratedDeleteService, DeleteSnackbar } = useActionSnackbar(
    "delete",
    httpService.deleteSchedule
  )

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
    const clickedId = getClickedScheduleId(e)
    setClickedScheduleId(getClickedScheduleId(e))
    if (
      window.confirm(`Are you sure you want to delete schedule id ${clickedId}`)
    ) {
      const isSuccessful = await callDecoratedDeleteService([clickedId])
      if (isSuccessful) {
        updateSchedulesList("delete", schedules, clickedId)
      }
    }
  }

  function updateSchedulesList(action, schedules, clickedSchedudleId) {
    let newSchedules
    switch (action) {
      case "delete":
        newSchedules = schedules.filter(({ scheduleId }) => {
          return scheduleId !== clickedSchedudleId
        })
        break
      default:
        return schedules
    }
    setSchedules(newSchedules)
  }

  function onPublishScheduleClicked(e) {
    console.log(
      `Publish schedule id ${e.currentTarget.getAttribute("scheduleId")}`
    )
    setOpenPublishDialog(true)
    setClickedScheduleId(getClickedScheduleId(e))
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
  }, [setIsFetchSuccess])

  const classes = useStyles()

  return (
    <>
      <DeleteSnackbar />
      <AddScheduleFloatingButton />
      <Grid container className={classes.container}>
        {!schedules ? (
          <FetchNotificationDiv
            isFetchSuccess={isFetchSuccess}
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
