import { createSlice } from "@reduxjs/toolkit"
import { exerciseNames } from "./exerciseNames"

const initialState = exerciseNames.reduce((acc, k) => {
  acc[k] = null
  return acc
}, {})

export const practiceBestsSlice = createSlice({
  name: "practiceBests",
  initialState,
  reducers: {
    setOnePracticeBest: (state, action) => {
      const { exerciseName, payload } = action.payload
      state[`${exerciseName}`] = payload
    },
  },
})

//selector
export const selectOnePracticeBest = (state, exerciseName) =>
  state[`${exerciseName}`]

//action type
export const { setOnePracticeBest } = practiceBestsSlice.actions

//reducer to register with global store
export default practiceBestsSlice.reducer
