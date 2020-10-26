import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  learnerName: null,
  email: null,
}

export const learnerInfoSlice = createSlice({
  name: "learnerInfo",
  initialState,
  reducers: {
    initLearnerInfo: (state, action) => {
      state.learnerName = action.payload.learnerName
    },
  },
})

//action type
export const { initLearnerInfo } = learnerInfoSlice.actions

export const selectLearnerInfo = (state) => state.learnerInfo

//reducer to register with global store
export default learnerInfoSlice.reducer
