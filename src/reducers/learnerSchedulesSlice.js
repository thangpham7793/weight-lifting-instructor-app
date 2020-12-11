import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  schedules: [],
}

export const learnerSchedulesSlice = createSlice({
  name: "learnerschedules",
  initialState,
  reducers: {
    initSchedules: (state, action) => {
      state.schedules = [...action.payload]
    },
  },
})

//selector
export const selectLearnerSchedules = (state) =>
  state.learnerSchedules.schedules

export const selectScheduleById = (state, scheduleId) =>
  state.learnerSchedules.schedules.find(
    (s) => s.scheduleId === parseInt(scheduleId)
  )

//action type
export const { initSchedules } = learnerSchedulesSlice.actions

//reducer to register with global store
export default learnerSchedulesSlice.reducer
