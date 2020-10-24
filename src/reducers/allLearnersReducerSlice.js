import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  learners: null,
}

export const allLearnersSlice = createSlice({
  name: "allLearners",
  initialState,
  reducers: {
    initAllLearners: (state, action) => {
      state.learners = action.payload
    },
  },
})

//selector
export const selectAllLearners = (state) => state.allLearners.learners

//action type
export const { initAllLearners } = allLearnersSlice.actions

//reducer to register with global store
export default allLearnersSlice.reducer
