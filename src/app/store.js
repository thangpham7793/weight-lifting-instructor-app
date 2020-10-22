import { configureStore } from "@reduxjs/toolkit"
import learnerSchedulesReducer from "../reducers/learnerSchedulesSlice"
import learnerPbsReducer from "../reducers/learnerPbsSlice"
import dailyExercisesReducer from "../reducers/dailyExercisesSlice"
import practiceBestsReducer from "../reducers/practiceBestsSlice"

export default configureStore({
  reducer: {
    learnerSchedules: learnerSchedulesReducer,
    learnerPbs: learnerPbsReducer,
    dailyExercises: dailyExercisesReducer,
    practiceBests: practiceBestsReducer,
  },
})
