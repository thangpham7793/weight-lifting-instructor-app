import React, { useState, useEffect, useCallback, useRef } from "react"
import { Grid } from "@material-ui/core"
import {
  PersonalBestsForm,
  LearnerSearchPanel,
  HistoricalPersonalBestsList,
  ExerciseNameOptions,
} from "./register"
import { ActionNotificationDiv } from "../ActionNotificationDiv"
import { useFetchSnackbar } from "../../hooks/register"
import httpService from "../../services/LearnerServiceSingleton"
import { shallowEqual } from "../../utils"
import { NavHelpers } from "../../services/register"
import { useDispatch, useSelector } from "react-redux"
import {
  initAllLearners,
  selectAllLearners,
} from "../../reducers/allLearnersReducerSlice"
import {
  fetchAllPbsByLearnerId,
  selectPbsByLearnerId,
} from "../../reducers/practiceBestsSlice"
import { Message } from "@material-ui/icons"
import SingleExerciseRecordList from "../LearnerApp/PracticeBestsPage/SingleExerciseRecordList"

export function LearnersPanel() {
  NavHelpers.setCurrentPage("/instructor/learners")
  const dispatch = useDispatch()
  const [learners, setLearners] = useState(useSelector(selectAllLearners))
  const [displayedLearners, setDisplayedLearners] = useState(learners)
  const [searchPhrase, setSearchPhrase] = useState("")
  const [selectedLearner, setSelectedLearner] = useState(null)
  const [canEditAndUpdate, setCanEditAndUpdate] = useState(false)
  const [actionStatus, setActionStatus] = useState({
    action: null,
    isActionSuccess: null,
  })

  const selectedLearnerPbs = useSelector((state) => {
    return selectedLearner
      ? selectPbsByLearnerId(state, selectedLearner.learnerId)
      : null
  })

  const fetchedLearnerIds = useRef([])

  const { FetchNotificationDiv } = useFetchSnackbar("learner")
  const [selectedExerciseName, setSelectedExerciseName] = useState("snatch")

  const onExerciseNameSelected = useCallback((e) => {
    setSelectedExerciseName(e.target.value)
  }, [])

  function onCloseActionStatusDiv(e) {
    setActionStatus({ action: null, isActionSuccess: null })
  }

  function filterLearners(learners, phrase) {
    const processedPhrase = phrase.trim().toLowerCase()

    if (processedPhrase.length === 0) return learners

    return learners.filter(
      ({ firstName, lastName }) =>
        firstName.toLowerCase().trim().startsWith(processedPhrase) ||
        lastName.toLowerCase().trim().startsWith(processedPhrase)
    )
  }

  function onSearchPhraseChanged(e) {
    const phrase = e.target.value

    //the two operations are not synchronous!
    setSearchPhrase(e.target.value)
    //dont set it using the searchPhrase because React may not have updated it with the new value
    setDisplayedLearners(filterLearners(learners, phrase))
  }

  const onLearnerItemClicked = useCallback(
    (e) => {
      function getLearnerById(id) {
        //avoid filter if ur searching for just one and all items are unique
        return learners.find(({ learnerId }) => learnerId === parseInt(id))
      }
      return (function (e) {
        const selected = getLearnerById(
          e.currentTarget.getAttribute("learnerId")
        )
        setSelectedLearner(selected)
      })(e)
    },
    [setSelectedLearner, learners]
  )

  const onPersonalBestsInputChange = useCallback((e) => {
    return (function (e) {
      const changedField = e.currentTarget.getAttribute("name")
      const newValue = e.currentTarget.value
      setSelectedLearner((selectedLearner) => {
        let newSelectedLearner = { ...selectedLearner }
        newSelectedLearner[changedField] = newValue
        return newSelectedLearner
      })
    })(e)
  }, [])

  //FIXME: this may break if user's currently filtering!
  function updateUILearnerList(updatedLearnerIndex, action = "UPDATE") {
    const newLearnersList = [...learners]
    switch (action) {
      default:
        newLearnersList[updatedLearnerIndex] = selectedLearner
        //updated the list because name can be updated
        setLearners(newLearnersList)
        dispatch(initAllLearners(newLearnersList))
        setDisplayedLearners(
          filterLearners(newLearnersList, `${selectedLearner.firstName}`)
        )
        setSearchPhrase(`${selectedLearner.firstName}`)
        break
      case "DELETE":
        //remove the deleted learner
        newLearnersList.splice(updatedLearnerIndex, 1)
        //should go back to the full list after deleting
        setDisplayedLearners(newLearnersList)
        setLearners(newLearnersList)
        dispatch(initAllLearners(newLearnersList))
        //reset form
        setSelectedLearner(null)
        //reset searchPhrase
        setSearchPhrase("")
        break
    }
  }

  function getUpdatedLearnerIndex(learners, selectedLearner) {
    return learners.findIndex(({ learnerId }) => {
      return learnerId === selectedLearner.learnerId
    })
  }

  async function onUpdatePersonalBests(e) {
    const updatedLearnerIndex = getUpdatedLearnerIndex(
      learners,
      selectedLearner
    )

    if (
      !window.confirm(
        `Are you sure you want to update ${selectedLearner.firstName}'s record?`
      )
    ) {
      setSelectedLearner(null)
      setDisplayedLearners(learners)
      setSearchPhrase("")
      return
    } else {
      //check if the selectedLearner actually changes
      if (shallowEqual(learners[updatedLearnerIndex], selectedLearner)) {
        console.log("No need to rerender or update!")
        return
      }

      setActionStatus({ action: "update", isActionSuccess: null })

      const { ok } = await httpService.updateLearner(selectedLearner)

      if (ok) {
        //...when should you update?
        updateUILearnerList(updatedLearnerIndex)

        setActionStatus({ action: "update", isActionSuccess: true })
      } else {
        console.log("Updating failed!", ok)
        //refill the form with the old information
        setSelectedLearner(learners[updatedLearnerIndex])
        setSearchPhrase(selectedLearner.firstName)
        setActionStatus({ action: "update", isActionSuccess: false })
      }
    }
  }

  const enableEditAndUpdate = useCallback(() => {
    return (function () {
      setCanEditAndUpdate(!canEditAndUpdate)
    })()
  }, [canEditAndUpdate])

  async function onDeleteLearner(e) {
    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedLearner.firstName}'s record?`
      )
    ) {
      setCanEditAndUpdate(false)
      return
    }

    setActionStatus({ action: "delete", isActionSuccess: null })

    const { ok } = await httpService.deleteLearner(selectedLearner.learnerId)

    if (ok) {
      setActionStatus({ action: "delete", isActionSuccess: true })
      const updatedLearnerIndex = getUpdatedLearnerIndex(
        learners,
        selectedLearner
      )
      updateUILearnerList(updatedLearnerIndex, "DELETE")
      console.log("Deleting ... Success!")
    } else {
      setActionStatus({ action: "delete", isActionSuccess: false })
      console.log("Deleting failed!")
    }
  }

  useEffect(() => {
    async function fetchLearners() {
      const { ok, payload } = await httpService.fetchLearners()

      if (ok) {
        //the two operations are not synchronous!
        dispatch(initAllLearners(payload))
        setLearners(payload)
        setDisplayedLearners(payload)
      }
    }
    if (!learners) fetchLearners()
  }, [learners, dispatch])

  useEffect(() => {
    function setTimeOutFadeAway(second = 2) {
      return setTimeout(() => onCloseActionStatusDiv(), second * 1000)
    }

    if (actionStatus.isActionSuccess !== null) {
      const timerId = setTimeOutFadeAway()
      return function () {
        clearTimeout(timerId)
      }
    }
  }, [actionStatus.isActionSuccess])

  useEffect(() => {
    if (
      selectedLearner &&
      !fetchedLearnerIds.current.includes(selectedLearner.learnerId)
    ) {
      fetchedLearnerIds.current.push(selectedLearner.learnerId)
      dispatch(fetchAllPbsByLearnerId(selectedLearner.learnerId))
    }
  }, [selectedLearner, dispatch])

  return (
    <>
      {!learners && <FetchNotificationDiv />}
      <ActionNotificationDiv
        actionStatus={actionStatus}
        onCloseActionStatusDiv={onCloseActionStatusDiv}
      />
      <Grid
        container
        className="learnerPanelWrapper"
        style={{ display: "flex" }}
        wrap="nowrap"
      >
        {learners && displayedLearners && (
          <LearnerSearchPanel
            searchPhrase={searchPhrase}
            onSearchPhraseChanged={onSearchPhraseChanged}
            learners={learners}
            displayedLearners={displayedLearners}
            onLearnerItemClicked={onLearnerItemClicked}
          />
        )}
        {selectedLearner && (
          <>
            <PersonalBestsForm
              selectedLearner={selectedLearner}
              onPersonalBestsInputChange={onPersonalBestsInputChange}
              onUpdatePersonalBests={onUpdatePersonalBests}
              canEditAndUpdate={canEditAndUpdate}
              enableEditAndUpdate={enableEditAndUpdate}
              onDeleteLearner={onDeleteLearner}
              title="Personal Bests"
            />
            {selectedLearnerPbs && (
              <HistoricalPersonalBestsList
                title="Historical Bests"
                selectMenu={() => (
                  <ExerciseNameOptions
                    onExerciseNameSelected={onExerciseNameSelected}
                    selectedExerciseName={selectedExerciseName}
                    availableExercises={selectedLearnerPbs.reduce(
                      (exerciseNames, pbs) => [
                        ...exerciseNames,
                        pbs.exerciseName,
                      ],
                      []
                    )}
                  />
                )}
                pbsList={() => (
                  <SingleExerciseRecordList
                    records={selectedLearnerPbs.filter(
                      (pb) => pb.exerciseName === selectedExerciseName
                    )}
                    onEditClicked={() => console.log("Add Comment?")}
                    icon={Message}
                  />
                )}
              />
            )}
          </>
        )}
      </Grid>
    </>
  )
}
