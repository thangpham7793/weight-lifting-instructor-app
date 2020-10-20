import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { initPbs, selectLearnerPbs } from "../../reducers/learnerPbsSlice"
import {
  initDailyExercises,
  selectDailyExercises,
} from "../../reducers/dailyExercisesSlice"
import { useParams } from "react-router-dom"
import { LinkButton } from "../factoryComponent"
import { useFetchSnackbar } from "../../hooks/useFetchSnackbar"
import {
  DayOptions,
  DailyExerciseTable,
  FeedBackDialog,
  PbsDialog,
} from "./register"
import { Grid, Typography, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { shallowEqual } from "../../utils"
import programmeHttpService from "../../services/ProgrammeServiceSingleton"
import learnerHttpService from "../../services/LearnerServiceSingleton"

const useStyles = makeStyles(() => ({
  btn: {
    fontSize: "0.5rem",
    minWidth: "max-content",
    color: "var(--txt-cl)",
    padding: "0.5rem",
  },
}))

export function ExercisePage() {
  const dispatch = useDispatch()
  const { scheduleId, week } = useParams()
  const { prevWeek, prevScheduleId, exercises } = useSelector(
    selectDailyExercises
  )

  const [selectedDay, setSelectedDay] = useState("day 1")
  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false)
  const [openPbsDialog, setOpenPbsDialog] = useState(false)
  // const [pbs, setPbs] = useState(useSelector(selectLearnerPbs))
  const pbs = useSelector(selectLearnerPbs)
  const [tempPbs, setTempPbs] = useState(useSelector(selectLearnerPbs))

  const { setIsFetchSuccess, FetchNotificationDiv } = useFetchSnackbar(
    "exercises"
  )

  function onFeedbackDialogCloseClicked() {
    setOpenFeedbackDialog(false)
  }

  function onFeedbackDialogOpenClicked() {
    setOpenFeedbackDialog(true)
  }

  async function onPbsDialogCloseClicked() {
    if (!shallowEqual(pbs, tempPbs)) {
      //does this auto update UI ? like setState? (yes it does)
      const { ok } = await learnerHttpService.updateLearnerPbs(tempPbs)
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
    console.log(changedField)
    setTempPbs((tempPbs) => {
      let newTempPbs = { ...tempPbs }
      newTempPbs[`${changedField}`] = parseFloat(newValue)
        ? parseFloat(newValue)
        : 0
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
        setIsFetchSuccess(true)
        dispatch(initDailyExercises({ exercises: payload, scheduleId, week }))
      } else {
        setIsFetchSuccess(false)
      }
    }
    fetchExercises(scheduleId, week)
  }, [scheduleId, week, setIsFetchSuccess, prevScheduleId, prevWeek, dispatch])

  function onDaySelected(e) {
    setSelectedDay(e.target.value)
  }

  const classes = useStyles()

  return exercises ? (
    <>
      <Grid
        container
        direction="column"
        justify="space-around"
        style={{ height: "100%" }}
      >
        <Grid item>
          <Typography variant="h6" component="div">
            Week {week}
          </Typography>
          <DayOptions
            exercises={exercises}
            onDaySelected={onDaySelected}
            selectedDay={selectedDay}
            label="Day"
          />
          <DailyExerciseTable
            dailyExercises={exercises[selectedDay]}
            pbs={pbs}
          />
        </Grid>
        <Grid
          item
          container
          justify="space-between"
          wrap="nowrap"
          style={{ margin: "1rem auto", width: "100%", padding: "0 0.25rem" }}
        >
          <Grid item>
            <LinkButton
              variant="contained"
              color="primary"
              className={classes.btn}
              to="/learner/schedules"
              label="Schedules"
            >
              Schedules
            </LinkButton>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              onClick={onPbsDialogOpenClicked}
            >
              Edit PBs
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              onClick={onFeedbackDialogOpenClicked}
            >
              Feedback
            </Button>
          </Grid>
        </Grid>
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
    </>
  ) : (
    <Grid
      container
      direction="column"
      justify="space-around"
      style={{ height: "100%" }}
    >
      <FetchNotificationDiv />
    </Grid>
  )
}
