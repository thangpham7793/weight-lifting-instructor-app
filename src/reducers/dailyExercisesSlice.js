import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  exercises: null,
  prevWeek: null,
  prevScheduleId: null,
  stale: false,
}

export const dailyExercisesSlice = createSlice({
  name: "dailyExercises",
  initialState,
  reducers: {
    initDailyExercises: (state, action) => {
      state.exercises = JSON.parse(action.payload.exercises)
      state.prevWeek = action.payload.week
      state.prevScheduleId = action.payload.scheduleId
    },
  },
})

//selector
export const selectDailyExercises = (state) => state.dailyExercises

//action type
export const { initDailyExercises } = dailyExercisesSlice.actions

//reducer to register with global store
export default dailyExercisesSlice.reducer
