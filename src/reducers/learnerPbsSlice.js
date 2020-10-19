import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  pbs: {
    backSquat: 0,
    clean: 0,
    cleanAndJerk: 0,
    frontSquat: 0,
    jerk: 0,
    pushPress: 0,
    snatch: 0,
  },
}

export const learnerPbsSlice = createSlice({
  name: "learnerPbs",
  initialState,
  reducers: {
    initPbs: (state, action) => {
      state.pbs = action.payload
    },
  },
})

//selector
export const selectLearnerPbs = (state) => state.learnerPbs.pbs

//action type
export const { initPbs } = learnerPbsSlice.actions

//reducer to register with global store
export default learnerPbsSlice.reducer
