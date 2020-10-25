import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { initPbs, selectLearnerPbs } from "../../reducers/learnerPbsSlice"
import {
  initDailyExercises,
  selectDailyExercises,
} from "../../reducers/dailyExercisesSlice"
import { selectScheduleById } from "../../reducers/learnerSchedulesSlice"
import { useParams } from "react-router-dom"
import { useFetchSnackbar, useActionSnackbar } from "../../hooks/register"
import {
  DayOptions,
  DailyExerciseTable,
  FeedBackDialog,
  PbsDialog,
  WeekOptions,
} from "./register"
import { Grid, Typography } from "@material-ui/core"
import { shallowEqual } from "../../utils"
import programmeHttpService from "../../services/ProgrammeServiceSingleton"
import learnerHttpService from "../../services/LearnerServiceSingleton"
import { ExercisePageBtnPanel } from "./register"
import { quickStyles } from "../../services/register"
import { useHistory } from "react-router-dom"

export function ExercisePage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { scheduleId, week } = useParams()
  const { prevWeek, prevScheduleId, exercises } = useSelector(
    selectDailyExercises
  )
  const selectedSchedule = useSelector((state) =>
    selectScheduleById(state, scheduleId)
  )

  const pbs = useSelector(selectLearnerPbs)
  const [tempPbs, setTempPbs] = useState(useSelector(selectLearnerPbs))

  const [selectedDay, setSelectedDay] = useState("day 1")
  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false)
  const [openPbsDialog, setOpenPbsDialog] = useState(false)

  const { FetchNotificationDiv } = useFetchSnackbar("exercises")

  const {
    callDecoratedUpdatePbsService,
    UpdatePbsSnackbar,
  } = useActionSnackbar("update pbs", learnerHttpService.updateLearnerPbs)

  function onFeedbackDialogCloseClicked() {
    setOpenFeedbackDialog(false)
  }

  function onFeedbackDialogOpenClicked() {
    setOpenFeedbackDialog(true)
  }

  async function onPbsDialogCloseClicked(e) {
    const clickedBtn = e.currentTarget.getAttribute("name")
    if (clickedBtn === "Close") {
      setTempPbs(pbs)
      setOpenPbsDialog(false)
      return
    }

    if (!shallowEqual(pbs, tempPbs)) {
      const { ok } = await callDecoratedUpdatePbsService(tempPbs)
      if (ok) {
      }
    }
    dispatch(initPbs(tempPbs))
    setOpenPbsDialog(false)
  }

  function onPbsDialogOpenClicked() {
    setOpenPbsDialog(true)
  }

  function onPersonalBestsInputChange(e) {
    const changedField = e.target.getAttribute("name")
    const newValue = e.target.value
    setTempPbs((tempPbs) => {
      let newTempPbs = { ...tempPbs }
      newTempPbs[`${changedField}`] = newValue
      return newTempPbs
    })
  }

  useEffect(() => {
    async function fetchExercises(scheduleId, week) {
      //if it's the same week, don't fetch (this logic can be hidden away in asyncThunk)
      if (prevWeek === week && prevScheduleId === scheduleId) {
        return
      }
      const { ok, payload } = await programmeHttpService.fetchExercises(
        scheduleId,
        week
      )
      if (ok) {
        dispatch(initDailyExercises({ exercises: payload, scheduleId, week }))
      }
    }
    fetchExercises(scheduleId, week)
  }, [scheduleId, week, prevScheduleId, prevWeek, dispatch])

  function onDaySelected(e) {
    setSelectedDay(e.target.value)
  }

  function onWeekSelected(e) {
    history.push(`/learner/${scheduleId}/${e.target.value}`)
  }

  const classes = quickStyles({
    btn: {
      fontSize: "0.5rem",
      width: "100%",
      color: "var(--txt-cl)",
      padding: "0.5rem",
    },
    btnWrapper: {
      width: "30%",
    },
  })

  return exercises ? (
    <>
      <Grid
        container
        item
        direction="column"
        justify="space-around"
        style={{ height: "100%", margin: "0 auto" }}
        xs={12}
        sm={10}
        md={8}
        lg={6}
        wrap="nowrap"
      >
        <Grid item>
          {selectedSchedule && (
            <>
              <Typography variant="h6" component="div">
                {selectedSchedule.scheduleName}
              </Typography>
              <Grid item container justify="space-evenly" wrap="nowrap">
                <WeekOptions
                  weekCount={selectedSchedule.weekCount}
                  onWeekSelected={onWeekSelected}
                  selectedWeek={week}
                  label="Week"
                />
                <DayOptions
                  exercises={Object.keys(exercises)}
                  onDaySelected={onDaySelected}
                  selectedDay={selectedDay}
                  label="Day"
                />
              </Grid>
            </>
          )}
          <DailyExerciseTable
            dailyExercises={exercises[selectedDay]}
            pbs={pbs}
          />
        </Grid>
        <ExercisePageBtnPanel
          classes={classes}
          onPbsDialogOpenClicked={onPbsDialogOpenClicked}
          onFeedbackDialogOpenClicked={onFeedbackDialogOpenClicked}
        />
      </Grid>
      <FeedBackDialog
        onDialogCloseClicked={onFeedbackDialogCloseClicked}
        open={openFeedbackDialog}
      />
      <PbsDialog
        onDialogCloseClicked={onPbsDialogCloseClicked}
        open={openPbsDialog}
        pbs={tempPbs}
        onPersonalBestsInputChange={onPersonalBestsInputChange}
      />
      <UpdatePbsSnackbar />
    </>
  ) : (
    <Grid
      container
      direction="column"
      style={{ height: "100%", paddingTop: "2rem" }}
    >
      <FetchNotificationDiv />
    </Grid>
  )
}
