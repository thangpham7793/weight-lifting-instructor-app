import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { selectLearnerPbs } from "../../reducers/learnerPbsSlice"
import { useParams } from "react-router-dom"
import { LinkButton } from "../factoryComponent"
import { useFetchSnackbar } from "../../hooks/useFetchSnackbar"
import { DayOptions, DailyExerciseTable } from "./register"
import { Grid } from "@material-ui/core"
import httpService from "../../services/ProgrammeServiceSingleton"

const testExercises = {
  "day 1": [
    {
      exerciseName: "Snatch + Overhead Squat",
      instruction: "75% 1r4s",
    },
    {
      exerciseName: "Power Clean + Push Press",
      instruction: "65% 2+3r3s",
    },
    {
      exerciseName: "Snatch Panda Pull",
      instruction: "90% 2r3s",
    },
    {
      exerciseName: "Back Squat",
      instruction: "77% 3r3s",
    },
    {
      exerciseName: "Situps on Roman Chair or Hanging knee/leg raise",
      instruction: "RPE6 10r3s",
    },
  ],
  "day 2.5": [
    {
      exerciseName: "Muscle Snatch",
      instruction: "65% 2r3s",
    },
    {
      exerciseName: "Pullups",
      instruction: "4RIR3s or RPE6 6r2s",
    },
    {
      exerciseName: "Clean Romanian Deadlift",
      instruction: "RPE6 10r2s",
    },
  ],
  "day 2": [
    {
      exerciseName: "Clean + Jerk",
      instruction: "75% 1+2r3s",
    },
    {
      exerciseName: "Power Snatch",
      instruction: "65% 2r3s",
    },
    {
      exerciseName: "Front Squat",
      instruction: "80% 2r3s",
    },
    {
      exerciseName: "Dips",
      instruction: "RPE6 8r2s or 4RIR2s",
    },
    {
      exerciseName: "Back Extension",
      instruction: "RPE6 10r2s or 4RIR2s",
    },
  ],
  "day 3": [
    {
      exerciseName: "Snatch",
      instruction: "80% 1r4s",
    },
    {
      exerciseName: "Clean + Front Squat + Jerk",
      instruction: "77% 1r3s",
    },
    {
      exerciseName: "OPTIONAL: Clean Pull",
      instruction: "90% 3r3s",
    },
    {
      exerciseName: "Back Squat",
      instruction: "83% 2r1s, 78% 2r1s",
    },
    {
      exerciseName: "Bench Press OR Strict Press",
      instruction: "RPE6 4r3s",
    },
    {
      exerciseName: "OPTIONAL: Clean Deadlift",
      instruction: "110% 3r3s",
    },
  ],
}

export function ExercisePage() {
  const { scheduleId, week } = useParams()
  const [exercises, setExercises] = useState(null)
  const [selectedDay, setSelectedDay] = useState("day 1")
  const [pbs, setPbs] = useState(useSelector(selectLearnerPbs))

  const { setIsFetchSuccess, FetchNotificationDiv } = useFetchSnackbar(
    "exercises"
  )

  useEffect(() => {
    async function fetchExercises(scheduleId, week) {
      // const { ok, payload } = await httpService.fetchExercises(scheduleId, week)
      if (true) {
        setIsFetchSuccess(true)
        setExercises(testExercises)
        // setExercises(JSON.parse(payload))
      } else {
        setIsFetchSuccess(false)
      }
    }
    fetchExercises(scheduleId, week)
  }, [scheduleId, week, setIsFetchSuccess])

  function onDaySelected(e) {
    setSelectedDay(e.target.value)
  }

  return exercises ? (
    <Grid
      container
      direction="column"
      justify="space-around"
      style={{ height: "100%" }}
    >
      <Grid item>
        <DayOptions
          exercises={exercises}
          onDaySelected={onDaySelected}
          selectedDay={selectedDay}
          label="Day"
        />
        <DailyExerciseTable dailyExercises={exercises[selectedDay]} pbs={pbs} />
      </Grid>
      <Grid container justify="space-evenly" item>
        <Grid item>
          <LinkButton
            className="submit-btn"
            style={{ fontSize: "0.75rem" }}
            // onClick={onBackToSchedulesClicked}
            to="/learner/schedules"
            label="Schedules"
          >
            Schedules
          </LinkButton>
        </Grid>
        <Grid item>
          <button className="submit-btn" style={{ fontSize: "0.75rem" }}>
            Edit PBs
          </button>
        </Grid>
        <Grid item>
          <button className="submit-btn" style={{ fontSize: "0.75rem" }}>
            Feedback
          </button>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <FetchNotificationDiv />
  )
}
