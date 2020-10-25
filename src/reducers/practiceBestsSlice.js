import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { exerciseNames } from "./exerciseNames"
import httpService from "../services/LearnerServiceSingleton"
import { repMaxrange } from "../utils"
// eslint-disable-next-line no-extend-native
Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000)
  return this
}

function sortByDescendingDate(a, b) {
  return new Date(a.lastEdited).valueOf() < new Date(b.lastEdited).valueOf()
}

function sortByAscendingRepMax(a, b) {
  return parseInt(a.repMax.substr(1)) > parseInt(b.repMax.substr(1))
}

function groupByRepMax(sortedArr) {
  return repMaxrange(10).reduce((acc, repMax) => {
    let sorted = sortedArr
      .filter((e) => e.repMax === repMax)
      .sort(sortByDescendingDate)
    return sorted.length === 0 ? acc : [...acc, ...sorted]
  }, [])
}

function sortExercises(exercises) {
  return groupByRepMax(exercises.sort(sortByAscendingRepMax))
}

let initialState = exerciseNames.reduce((acc, k) => {
  acc[k] = null
  return acc
}, {})

initialState = { ...initialState, currentRepMax: "All", instructorApp: {} }

export const fetchAllPbsByLearnerId = createAsyncThunk(
  "practiceBests/fetchAll",
  async (learnerId) => {
    console.log("I was called!")
    const { ok, payload } = await httpService.getAllPracticeBestsOfOneLearner(
      learnerId
    )
    if (ok) {
      return { payload, learnerId }
    }
  }
)

export const practiceBestsSlice = createSlice({
  name: "practiceBests",
  initialState,
  reducers: {
    setOnePracticeBest: (state, action) => {
      const { exerciseName, records } = action.payload
      state[`${exerciseName}`] = records
    },
    addNewRecord: (state, action) => {
      const { exerciseName, repMax } = action.payload
      state[`${exerciseName}`].push(action.payload)
      state.currentRepMax = repMax
    },
    updateOneRecord: (state, action) => {
      const { exerciseName, pbId } = action.payload
      const targetArr = state[`${exerciseName}`] //holds a reference to the orginal arr
      const updatedIndex = targetArr.findIndex((r) => r.pbId === pbId)
      targetArr[updatedIndex] = action.payload
      targetArr[updatedIndex].lastEdited = new Date()
        .addHours(13)
        .toISOString()
        .substr(0, 10)
    },
    deleteOneRecord: (state, action) => {
      const { exerciseName, pbId } = action.payload
      const targetArr = state[`${exerciseName}`]
      const deletedIndex = targetArr.findIndex((r) => r.pbId === pbId)
      targetArr.splice(deletedIndex, 1)
    },
    setCurrentRepMax: (state, action) => {
      state.currentRepMax = action.payload
    },
    initLearnerPbs: (state, action) => {
      const { learnerId, historicalPbs } = action.payload
      state.instructorApp[`${learnerId}`] = historicalPbs
    },
  },
  extraReducers: {
    [fetchAllPbsByLearnerId.fulfilled]: (state, action) => {
      const { payload, learnerId } = action.payload
      state.instructorApp[`${learnerId}`] = payload
    },
  },
})

//selector
export const selectOnePracticeBest = (state, exerciseName) => {
  return state.practiceBests[`${exerciseName}`]
    ? sortExercises(
        state.practiceBests[`${exerciseName}`].filter((exercise) => {
          return state.practiceBests.currentRepMax === "All"
            ? true
            : exercise.repMax === state.practiceBests.currentRepMax
        })
      )
    : null
}

export const selectPracticeBestRecordsById = (state, exerciseName, pbId) => {
  return state.practiceBests[`${exerciseName}`].find(
    (i) => i.pbId === parseInt(pbId)
  )
}

export const selectCurrentRepMax = (state) => state.practiceBests.currentRepMax

export const selectPbsByLearnerId = (state, learnerId) =>
  state.practiceBests.instructorApp[`${learnerId}`]

export const selectFetchedLearnerIds = (state) =>
  Object.keys(state.practiceBests.instructorApp)

//action type
export const {
  setOnePracticeBest,
  updateOneRecord,
  deleteOneRecord,
  addNewRecord,
  setCurrentRepMax,
  initLearnerPbs,
} = practiceBestsSlice.actions

//reducer to register with global store
export default practiceBestsSlice.reducer
