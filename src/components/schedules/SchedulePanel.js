import React, { useState, useEffect } from "react"
import {
  ScheduleCards,
  AddScheduleFloatingButton,
  ReuploadScheduleDialog,
  PublishScheduleDialog,
} from "./register"
import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
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

  // ATTENTION: use object as API rather than array since we can pick and choose what to destructure. Downside is the prop name is fixed.
  const { setIsFetchSuccess, FetchNotificationDiv } = useFetchSnackbar(
    "schedules"
  )

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
        updateSchedulesList("delete", clickedId)
      }
    }
  }

  //similar to Redux (maybe use React.Context?)
  function updateSchedulesList(action, payload) {
    let newSchedules
    switch (action) {
      case "delete":
        newSchedules = schedules.filter(({ scheduleId }) => {
          return scheduleId !== payload
        })
        break
      case "upload":
        newSchedules = [...schedules, payload]
        break
      //should be just this as the child component has all the information needed to return a new schedule info object
      case "publish":
        const { scheduleId, programmes } = payload

        console.log(scheduleId, programmes)

        newSchedules = [...schedules]
        //this returns a reference to the item in the array
        const updatedSchedule = newSchedules.find(
          (s) => s.scheduleId === scheduleId
        )
        //does this modify the wrapper array?
        updatedSchedule.programmes = [
          ...updatedSchedule.programmes,
          ...programmes,
        ]
        break
      case "repost":
        newSchedules = [...schedules, payload]
        return
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
      const { ok, payload } = await httpService.fetchScheduleInfo()
      if (ok) {
        setIsFetchSuccess(true)
        setSchedules(payload)
      }
      setIsFetchSuccess(false)
    }
    fetchSchedules()
  }, [setIsFetchSuccess])

  const classes = useStyles()

  return (
    <>
      <DeleteSnackbar />
      <AddScheduleFloatingButton onActionSuccess={updateSchedulesList} />
      <Grid container className={classes.container}>
        {!schedules ? (
          <FetchNotificationDiv style={{ margin: "0 auto" }} />
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
        onActionSuccess={updateSchedulesList}
      />
      <PublishScheduleDialog
        open={openPublishDialog}
        onDialogCloseClicked={onDialogCloseClicked}
        scheduleId={clickedScheduleId}
        onActionSuccess={updateSchedulesList}
      />
    </>
  )
}
