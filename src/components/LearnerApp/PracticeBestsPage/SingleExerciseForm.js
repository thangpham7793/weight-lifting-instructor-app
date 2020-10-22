import React, { useEffect, useState, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  selectOnePracticeBest,
  setOnePracticeBest,
} from "../../../reducers/practiceBestsSlice"
import httpService from "../../../services/LearnerServiceSingleton"
import { useParams } from "react-router-dom"
import SingleExerciseRecordList from "./SingleExerciseRecordList"
import EditSingleRecordDialog from "./EditSingleRecordDialog"
import { Grid } from "@material-ui/core"
import { quickStyles } from "../../../services/register"

export function SingleExerciseForm() {
  const classes = quickStyles({
    wrapper: {
      height: "100%",
    },
  })

  const [clickedPbId, setClickedPbId] = useState(null)
  const [open, setOpen] = useState(false)

  const { exerciseName } = useParams()
  const dispatch = useDispatch()
  const records = useSelector((state) =>
    selectOnePracticeBest(state, exerciseName)
  )

  useEffect(() => {
    async function fetchRecords(exerciseName) {
      if (!records) {
        const {
          ok,
          payload,
        } = await httpService.getPracticeBestsByExerciseName(exerciseName)
        if (ok) {
          dispatch(setOnePracticeBest({ exerciseName, records: payload }))
        } else {
          return
        }
      }
    }
    fetchRecords(exerciseName)
  }, [exerciseName, dispatch, records])

  function onEditClicked(e) {
    const pbId = parseInt(e.currentTarget.getAttribute("pbid"))
    console.log(pbId)
    setClickedPbId(pbId)
    setOpen(true)
  }

  const memoizedOnEditClicked = useCallback((e) => {
    onEditClicked(e)
  }, [])

  function onDialogCloseClicked() {
    setOpen(false)
  }

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignContent="center"
      className={classes.wrapper}
    >
      {records ? (
        <SingleExerciseRecordList
          records={records}
          onEditClicked={memoizedOnEditClicked}
        />
      ) : (
        <div>Fetching Records for {exerciseName}</div>
      )}
      <EditSingleRecordDialog
        open={open}
        onDialogCloseClicked={onDialogCloseClicked}
        clickedPbId={clickedPbId}
      />
    </Grid>
  )
}
