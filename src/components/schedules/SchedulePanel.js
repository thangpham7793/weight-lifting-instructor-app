import React, { useState, useEffect } from "react"
import {
  ScheduleCards,
  AddScheduleFloatingButton,
  ReuploadScheduleDialog,
  PublishScheduleDialog,
} from "./register"
import ScheduleReducers from "./ScheduleReducers"

import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useActionSnackbar, useFetchSnackbar } from "../../hooks/register"
import httpService from "../../services/ProgrammeServiceSingleton"
import { fileReaderPromise } from "../../services/register"
import { NavHelpers } from "../../services/register"

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: "space-around",
  },
  item: {
    margin: "var(--mg-sm)",
    padding: 0,
  },
}))

function resetState(currentState, initialState, setStateFunc) {
  if (currentState !== initialState) {
    setStateFunc(initialState)
  }
}

function checkCanUpdate(newName, currentName, isFileUploaded) {
  const isValidLength = newName.length > 0
  const isNewName = newName !== currentName
  const caseOne = !isFileUploaded && isValidLength && isNewName
  const caseTwo = isFileUploaded && isValidLength
  return caseOne || caseTwo
}

export function SchedulePanel() {
  NavHelpers.setCurrentPage("/instructor/schedules")
  const [schedules, setSchedules] = useState(null)
  const [clickedScheduleId, setClickedScheduleId] = useState(null)
  const [clickedSchedule, setClickedSchedule] = useState(null)
  const [currentScheduleName, setCurrentScheduleName] = useState(null)
  const [openReuploadDialog, setOpenReuploadDialog] = useState(false)
  const [openPublishDialog, setOpenPublishDialog] = useState(false)
  const [canUpdate, setCanUpdate] = useState(false)
  const [buffer, setBuffer] = useState(null)
  const [isFileUploaded, setIsFileUploaded] = useState(false)

  // ATTENTION: use object as API rather than array since we can pick and choose what to destructure. Downside is the prop name is fixed. That's why useState is [state, setState] rather than {state, setState}
  const { setIsFetchSuccess, FetchNotificationDiv } = useFetchSnackbar(
    "schedules"
  )

  const { callDecoratedDeleteService, DeleteSnackbar } = useActionSnackbar(
    "delete",
    httpService.deleteSchedule
  )

  const updateSchedulesList = ScheduleReducers.factory(schedules, setSchedules)

  async function onFileUploaded(e) {
    const selectedFile = e.target.files[0]
    const buffer = await fileReaderPromise(selectedFile)
    setBuffer(buffer)
    setIsFileUploaded(true)
    setCanUpdate(true)
  }

  function getClickedScheduleId(e) {
    return parseInt(e.currentTarget.getAttribute("scheduleId"))
  }

  function onEditScheduleClicked(e) {
    //need to use currentTarget since it's a material icon component so need to get the reference to the underlying base DOM element
    console.log(e.currentTarget.getAttribute("scheduleId"))
    setOpenReuploadDialog(true)
    setClickedScheduleId(getClickedScheduleId(e))
    const clicked = schedules.find(
      (s) => s.scheduleId === getClickedScheduleId(e)
    )

    setClickedSchedule(clicked)
    setCurrentScheduleName(clicked.scheduleName)
  }

  //shared by all dialogs since only one can be opened at the same time
  function onDialogCloseClicked(e) {
    resetState(openReuploadDialog, false, setOpenReuploadDialog)
    resetState(openPublishDialog, false, setOpenPublishDialog)
    resetState(isFileUploaded, false, setIsFileUploaded)
    resetState(canUpdate, false, setCanUpdate)

    resetState(buffer, null, setBuffer)
    resetState(clickedSchedule, null, setClickedSchedule)
    resetState(currentScheduleName, null, setCurrentScheduleName)
  }

  async function onDeleteScheduleClicked(e) {
    const scheduleId = getClickedScheduleId(e)
    setClickedScheduleId(getClickedScheduleId(e))
    if (
      window.confirm(
        `Are you sure you want to delete schedule id ${scheduleId}`
      )
    ) {
      const { ok } = await callDecoratedDeleteService(scheduleId)
      if (ok) {
        updateSchedulesList("delete", { scheduleId })
      }
    }
  }

  function onPublishScheduleClicked(e) {
    console.log(
      `Publish schedule id ${e.currentTarget.getAttribute("scheduleId")}`
    )
    setOpenPublishDialog(true)
    setClickedScheduleId(getClickedScheduleId(e))
  }

  function onClickedScheduleNameChanged(e) {
    const scheduleName = e.target.value
    setClickedSchedule({ ...clickedSchedule, scheduleName })
    setCanUpdate(
      checkCanUpdate(scheduleName, currentScheduleName, isFileUploaded)
    )
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
              onActionSuccess={updateSchedulesList}
              // something about closer/scope that prevents passing references here
            />
          </>
        )}
      </Grid>
      <ReuploadScheduleDialog
        open={openReuploadDialog}
        onDialogCloseClicked={onDialogCloseClicked}
        clickedSchedule={clickedSchedule}
        onActionSuccess={updateSchedulesList}
        onClickedScheduleNameChanged={onClickedScheduleNameChanged}
        canUpdate={canUpdate}
        buffer={buffer}
        isFileUploaded={isFileUploaded}
        onFileUploaded={onFileUploaded}
      />
      <PublishScheduleDialog
        open={openPublishDialog}
        onDialogCloseClicked={onDialogCloseClicked}
        scheduleId={clickedScheduleId}
        onActionSuccess={updateSchedulesList}
      />

      <DeleteSnackbar />
    </>
  )
}
