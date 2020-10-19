import { configureStore } from "@reduxjs/toolkit"
import learnerSchedulesReducer from "../reducers/learnerSchedulesSlice"
import learnerPbsReducer from "../reducers/learnerPbsSlice"

export default configureStore({
  reducer: {
    learnerSchedules: learnerSchedulesReducer,
    learnerPbs: learnerPbsReducer,
  },
})
