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
import { fileReaderPromise } from "../../services/register"

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: "space-around",
  },
  item: {
    margin: "var(--mg-sm)",
    padding: 0,
  },
}))

function updateScheduleDetails(
  { scheduleId, scheduleName, weekCount },
  prevSchedules
) {
  const newSchedules = [...prevSchedules]
  const targetIndex = newSchedules.findIndex((s) => s.scheduleId === scheduleId)
  newSchedules[targetIndex] = {
    ...newSchedules[targetIndex],
    scheduleName,
    weekCount,
  }
  return newSchedules
}

function addPublishedProgramme({ scheduleId, programmes }, prevSchedules) {
  const newSchedules = [...prevSchedules]
  //this returns a reference to the item in the array
  const updatedSchedule = newSchedules.find((s) => s.scheduleId === scheduleId)

  updatedSchedule.programmes = [...updatedSchedule.programmes, ...programmes]
  return newSchedules
}

function removeProgrammeFromSchedule(
  { scheduleId, targetProgramme },
  prevSchedules
) {
  let newSchedules = [...prevSchedules]
  let targetSchedule = newSchedules.find((s) => s.scheduleId === scheduleId)
  let removedProgrammeIndex = targetSchedule.programmes.findIndex(
    (p) => p.programmeId === targetProgramme.programmeId
  )
  targetSchedule.programmes.splice(removedProgrammeIndex, 1)
  return newSchedules
}

export function SchedulePanel() {
  const [schedules, setSchedules] = useState(null)
  const [clickedScheduleId, setClickedScheduleId] = useState(null)
  const [clickedSchedule, setClickedSchedule] = useState(null)
  const [currentScheduleName, setCurrentScheduleName] = useState(null)
  const [openReuploadDialog, setOpenReuploadDialog] = useState(false)
  const [openPublishDialog, setOpenPublishDialog] = useState(false)
  const [canUpdate, setCanUpdate] = useState(false)

  function checkCanUpdate(newName, currentName, isFileUploaded) {
    const isValidLength = newName.length > 0
    const isNewName = newName !== currentName
    const caseOne = !isFileUploaded && isValidLength && isNewName
    const caseTwo = isFileUploaded && isValidLength

    return caseOne || caseTwo
  }

  const [buffer, setBuffer] = useState(null)
  const [isFileUploaded, setIsFileUploaded] = useState(false)
  async function onFileUploaded(e) {
    const selectedFile = e.target.files[0]
    const buffer = await fileReaderPromise(selectedFile)
    setBuffer(buffer)
    setIsFileUploaded(true)
    setCanUpdate(true)
  }
  // ATTENTION: use object as API rather than array since we can pick and choose what to destructure. Downside is the prop name is fixed.
  let { setIsFetchSuccess, FetchNotificationDiv } = useFetchSnackbar(
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

    const clicked = schedules.find(
      (s) => s.scheduleId === getClickedScheduleId(e)
    )

    setClickedSchedule(clicked)
    setCurrentScheduleName(clicked.scheduleName)
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
      const isSuccessful = await callDecoratedDeleteService(clickedId)
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
        newSchedules = addPublishedProgramme(payload, schedules)
        break
      case "unpublish":
        newSchedules = removeProgrammeFromSchedule(payload, schedules)
        break
      case "repost":
        //reposting may update the name as well as the weekCount (UI-wise)
        newSchedules = updateScheduleDetails(payload, schedules)
        console.log(payload)
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
    </>
  )
}
