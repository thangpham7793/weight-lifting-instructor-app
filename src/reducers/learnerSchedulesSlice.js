import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  schedules: [
    {
      scheduleId: 12,
      scheduleName: "October 2020 Peaking Cycle",
      weekCount: 6,
      programmeName: "Youth and Junior",
    },
    {
      scheduleId: 6,
      scheduleName: "September 2020 Strength",
      weekCount: 5,
      programmeName: "Youth and Junior",
    },
  ],
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

//action type
export const { initSchedules } = learnerSchedulesSlice.actions

//reducer to register with global store
export default learnerSchedulesSlice.reducer
