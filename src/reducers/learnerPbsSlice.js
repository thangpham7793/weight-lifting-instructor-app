import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  pbs: {
    backSquat: 100,
    clean: 100,
    cleanAndJerk: 100,
    frontSquat: 100,
    jerk: 100,
    pushPress: 100,
    snatch: 100,
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
