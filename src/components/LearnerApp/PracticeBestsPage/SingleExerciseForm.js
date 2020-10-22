import React, { useEffect, useState, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  selectOnePracticeBest,
  setOnePracticeBest,
  updateOneRecord,
} from "../../../reducers/practiceBestsSlice"
import httpService from "../../../services/LearnerServiceSingleton"
import { useParams } from "react-router-dom"
import SingleExerciseRecordList from "./SingleExerciseRecordList"
import EditSingleRecordDialog from "./EditSingleRecordDialog"
import { shallowEqual } from "../../../utils"
import { Grid } from "@material-ui/core"
import { quickStyles } from "../../../services/register"

export function SingleExerciseForm() {
  const classes = quickStyles({
    wrapper: {
      height: "100%",
    },
  })

  const { exerciseName } = useParams()
  const records = useSelector((state) =>
    selectOnePracticeBest(state, exerciseName)
  )
  const dispatch = useDispatch()

  const [clickedRecord, setClickedRecord] = useState(null)
  const [open, setOpen] = useState(false)
  const [tempRecord, setTempRecord] = useState(null)

  function onRecordInputChange(e) {
    const changedField = e.currentTarget.getAttribute("name")
    const newValue = e.currentTarget.value
    setTempRecord((currentRecord) => {
      let newRecord = { ...currentRecord }
      newRecord[`${changedField}`] = newValue
      return newRecord
    })
  }

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

  const memoizedOnEditClicked = useCallback(
    (e) => {
      function onEditClicked(e) {
        const pbId = e.currentTarget.getAttribute("pbid")
        console.log(pbId)
        const clicked = records.find((r) => r.pbId === parseInt(pbId))
        setClickedRecord(clicked)
        setTempRecord(clicked)
        setOpen(true)
      }
      onEditClicked(e)
    },
    [records]
  )

  async function onDialogCloseClicked() {
    if (!shallowEqual(clickedRecord, tempRecord)) {
      //TODO: save to server first!
      const { ok } = await httpService.updatePracticeBest(tempRecord)
      if (ok) {
        dispatch(updateOneRecord(tempRecord))
      }
    }
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
      {tempRecord && (
        <EditSingleRecordDialog
          open={open}
          onDialogCloseClicked={onDialogCloseClicked}
          tempRecord={tempRecord}
          exerciseName={exerciseName}
          onRecordInputChange={onRecordInputChange}
        />
      )}
    </Grid>
  )
}
