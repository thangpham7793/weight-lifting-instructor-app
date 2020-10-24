import { configureStore } from "@reduxjs/toolkit"
import learnerSchedulesReducer from "../reducers/learnerSchedulesSlice"
import learnerPbsReducer from "../reducers/learnerPbsSlice"
import dailyExercisesReducer from "../reducers/dailyExercisesSlice"
import practiceBestsReducer from "../reducers/practiceBestsSlice"
import allLearnersReducer from "../reducers/allLearnersReducerSlice"

export default configureStore({
  reducer: {
    learnerSchedules: learnerSchedulesReducer,
    learnerPbs: learnerPbsReducer,
    allLearners: allLearnersReducer,
    dailyExercises: dailyExercisesReducer,
    practiceBests: practiceBestsReducer,
  },
})
