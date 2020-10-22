import React, { useEffect, useState, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  selectOnePracticeBest,
  setOnePracticeBest,
  updateOneRecord,
  deleteOneRecord,
} from "../../../reducers/practiceBestsSlice"
import httpService from "../../../services/LearnerServiceSingleton"
import { useParams } from "react-router-dom"
import SingleExerciseRecordList from "./SingleExerciseRecordList"
import EditSingleRecordDialog from "./EditSingleRecordDialog"
import { shallowEqual } from "../../../utils"
import { Grid } from "@material-ui/core"
import {
  quickStyles,
  validateNewRepMax,
  validateNewWeight,
} from "../../../services/register"
import { AddRecordFloatingButton } from "./AddRecordFloatingButton"

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

  const newRecordTemplate = {
    exerciseName: exerciseName,
    repMax: "x1",
    weight: 100.0,
    lastEdited: new Date().toDateString(),
  }

  const isValidInputTemplate = {
    repMax: true,
    weight: true,
    lastEdited: true,
  }
  //for an existing record
  const [clickedRecord, setClickedRecord] = useState(null)

  //for a new record (other fields will be auto filled in redux slice)
  const [tempRecord, setTempRecord] = useState(newRecordTemplate)

  const [openEditRecordDialog, setOpenEditRecordDialog] = useState(false)
  const [openAddNewRecordDialog, setOpenAddNewRecordDialog] = useState(false)
  const [isInputValid, setIsInputValid] = useState(isValidInputTemplate)

  function validateNewRecordAndUpdateState(e, setNewState) {
    const changedField = e.currentTarget.getAttribute("name")
    let newValue = e.currentTarget.value
    if (changedField === "weight") {
      if (validateNewWeight(newValue)) {
        setIsInputValid((state) => {
          return { ...state, weight: true }
        })
      } else {
        setIsInputValid((state) => {
          return { ...state, weight: false }
        })
      }
    }

    if (changedField === "repMax") {
      if (validateNewRepMax(newValue)) {
        setIsInputValid((state) => {
          return { ...state, repMax: true }
        })
      } else {
        setIsInputValid((state) => {
          return { ...state, repMax: false }
        })
      }
    }

    setNewState((currentRecord) => {
      let newRecord = { ...currentRecord }
      newRecord[`${changedField}`] = newValue
      return newRecord
    })
  }

  function onRecordInputChange(e) {
    validateNewRecordAndUpdateState(e, setClickedRecord)
  }

  function onTempRecordInputChange(e) {
    validateNewRecordAndUpdateState(e, setTempRecord)
  }

  function onAddNewRecordBtnClicked(e) {
    setOpenAddNewRecordDialog(true)
  }

  function resetStateAndValidator(isNew = true) {
    setIsInputValid(isValidInputTemplate)
    if (isNew) {
      setTempRecord(newRecordTemplate)
    }
  }

  async function onNewRecordDialogCloseClicked(e) {
    const btnName = e.currentTarget.getAttribute("name")

    if (btnName === "Close") {
      resetStateAndValidator()
      return setOpenAddNewRecordDialog(false)
    }
    setTempRecord(newRecordTemplate)
    setOpenAddNewRecordDialog(false)
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
        const clicked = records.find((r) => r.pbId === parseInt(pbId))
        setClickedRecord(clicked)
        setOpenEditRecordDialog(true)
      }
      onEditClicked(e)
    },
    [records]
  )

  async function onEditDialogCloseClicked(e) {
    const btnName = e.currentTarget.getAttribute("name")

    if (btnName === "Close") {
      resetStateAndValidator(false)
      return setOpenEditRecordDialog(false)
    } else if (btnName === "Delete") {
      if (window.confirm(`Are you sure you want to delete this record?`)) {
        const { ok } = await httpService.deletePracticeBest({
          pbId: clickedRecord.pbId,
        })
        if (ok) {
          dispatch(deleteOneRecord(clickedRecord))
        }
      }
      resetStateAndValidator(false)
      return setOpenEditRecordDialog(false)
    }

    if (
      !shallowEqual(
        records.find((r) => r.pbId === clickedRecord.pbId),
        clickedRecord
      )
    ) {
      const { ok } = await httpService.updatePracticeBest(clickedRecord)
      if (ok) {
        dispatch(updateOneRecord(clickedRecord))
      }
    } else {
      console.log("Same shit no update!")
    }
    resetStateAndValidator(false)
    return setOpenEditRecordDialog(false)
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
      {clickedRecord && (
        <EditSingleRecordDialog
          open={openEditRecordDialog}
          onDialogCloseClicked={onEditDialogCloseClicked}
          record={clickedRecord}
          exerciseName={exerciseName}
          onRecordInputChange={onRecordInputChange}
          isInputValid={isInputValid}
        />
      )}
      <AddRecordFloatingButton
        open={openAddNewRecordDialog}
        onDialogCloseClicked={onNewRecordDialogCloseClicked}
        onRecordInputChange={onTempRecordInputChange}
        record={tempRecord}
        onAddNewRecordBtnClicked={onAddNewRecordBtnClicked}
        isInputValid={isInputValid}
      />
    </Grid>
  )
}
