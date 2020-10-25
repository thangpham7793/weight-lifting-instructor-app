import { createSlice } from "@reduxjs/toolkit"

const initialState = {}

export const dailyExercisesSlice = createSlice({
  name: "dailyExercises",
  initialState,
  reducers: {
    initDailyExercises: (state, action) => {
      const { week, scheduleId } = action.payload
      state[`s${scheduleId}w${week}`] = JSON.parse(action.payload.exercises)
    },
  },
})

// [s1w2]: state[`s${scheduleId}]

//selector
export const selectDailyExercises = (state, scheduleId, week) =>
  state.dailyExercises[`s${scheduleId}w${week}`]

export const selectFetchedKeys = (state) => Object.keys(state.dailyExercises)

//action type
export const { initDailyExercises } = dailyExercisesSlice.actions

//reducer to register with global store
export default dailyExercisesSlice.reducer
