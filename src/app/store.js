import { configureStore } from "@reduxjs/toolkit"
import learnerSchedulesReducer from "../reducers/learnerSchedulesSlice"

export default configureStore({
  reducer: {
    learnerSchedules: learnerSchedulesReducer,
  },
})
