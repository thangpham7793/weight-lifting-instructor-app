import { createSlice } from "@reduxjs/toolkit"
import { exerciseNames } from "./exerciseNames"
// eslint-disable-next-line no-extend-native
Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000)
  return this
}

const initialState = exerciseNames.reduce((acc, k) => {
  acc[k] = null
  return acc
}, {})

export const practiceBestsSlice = createSlice({
  name: "practiceBests",
  initialState,
  reducers: {
    setOnePracticeBest: (state, action) => {
      const { exerciseName, records } = action.payload
      state[`${exerciseName}`] = records
    },
    addNewRecord: (state, action) => {
      const { exerciseName } = action.payload
      state[`${exerciseName}`].push(action.payload)
    },
    updateOneRecord: (state, action) => {
      const { exerciseName, pbId } = action.payload
      const targetArr = state[`${exerciseName}`] //holds a reference to the orginal arr
      const updatedIndex = targetArr.findIndex((r) => r.pbId === pbId)
      targetArr[updatedIndex] = action.payload
      targetArr[updatedIndex].lastEdited = new Date()
        .addHours(13)
        .toISOString()
        .substr(0, 10)
    },
    deleteOneRecord: (state, action) => {
      const { exerciseName, pbId } = action.payload
      const targetArr = state[`${exerciseName}`]
      const deletedIndex = targetArr.findIndex((r) => r.pbId === pbId)
      targetArr.splice(deletedIndex, 1)
    },
  },
})

//selector
export const selectOnePracticeBest = (state, exerciseName) => {
  return state.practiceBests[`${exerciseName}`]
}

export const selectPracticeBestRecordsById = (state, exerciseName, pbId) => {
  return state.practiceBests[`${exerciseName}`].find(
    (i) => i.pbId === parseInt(pbId)
  )
}

//action type
export const {
  setOnePracticeBest,
  updateOneRecord,
  deleteOneRecord,
  addNewRecord,
} = practiceBestsSlice.actions

//reducer to register with global store
export default practiceBestsSlice.reducer
