import React, { useState, useEffect } from "react"

import { LearnerNameList, PersonalBestsForm } from "./register"
import { FetchNotificationDivFactory } from "../factoryComponent"

import fetchService from "../../services/http"
import { shallowEqual } from "../../utils"

export function LearnersPanel() {
  const [learners, setLearners] = useState([])
  const [displayedLearners, setDisplayedLearners] = useState([])
  const [searchPhrase, setSearchPhrase] = useState("")
  const [selectedLearner, setSelectedLearner] = useState(null)
  const [canEditAndUpdate, setCanEditAndUpdate] = useState(false)

  //maybe these can be combined into a useNotification hook?
  const [isFetchSuccess, setIsFetchSuccess] = useState(null)
  const FetchLearnersNotificationDiv = FetchNotificationDivFactory(
    "learners",
    "Click On A Name"
  )

  function filterLearners(phrase) {
    const processedPhrase = phrase.trim().toLowerCase()

    if (processedPhrase.length === 0) return learners

    return learners.filter(
      ({ firstName, lastName }) =>
        firstName.toLowerCase().startsWith(processedPhrase) ||
        lastName.toLowerCase().startsWith(processedPhrase)
    )
  }

  function getLearnerById(id) {
    //avoid filter if ur searching for just one and all items are unique
    return learners.find(({ learnerId }) => learnerId === parseInt(id))
  }

  function onSearchPhraseChanged(e) {
    const phrase = e.target.value

    //the two operations are not synchronous!
    setSearchPhrase(e.target.value)
    //dont set it using the searchPhrase because React may not have updated it with the new value
    setDisplayedLearners(filterLearners(phrase))
  }

  function onLearnerItemClicked(e) {
    const selected = getLearnerById(e.target.getAttribute("learnerId"))

    //it still works if it's camelCase here
    console.log(selected)

    //must find a way to refresh trigger form refresh
    setSelectedLearner(selected)
  }

  function onPersonalBestsInputChange(e) {
    const changedField = e.target.getAttribute("name")
    const newValue = e.target.value.trim()

    //console.log(e.target.getAttribute("name"))

    setSelectedLearner((selectedLearner) => {
      let newSelectedLearner = { ...selectedLearner }
      newSelectedLearner[changedField] = newValue
      return newSelectedLearner
    })
  }

  function updateUILearnerList(updatedLearnerIndex) {
    const newLearnersList = [...learners]
    newLearnersList[updatedLearnerIndex] = selectedLearner
    //updated the list because name can be updated
    setDisplayedLearners(newLearnersList)
    setLearners(newLearnersList)
  }

  async function onUpdatePersonalBests(e) {
    //disable submission
    e.preventDefault()

    console.log(canEditAndUpdate)

    //only update everything after learner presses save (which turns off editting)
    if (!canEditAndUpdate) {
      const updatedLearnerIndex = learners.findIndex(
        ({ learnerId }) => learnerId === selectedLearner.learnerId
      )

      //check if the selectedLearner actually changes
      if (shallowEqual(learners[updatedLearnerIndex], selectedLearner)) {
        console.log("No need to rerender or update!")
        return
      }

      updateUILearnerList(updatedLearnerIndex)
      console.log(`Sending ${JSON.stringify(selectedLearner)}`)

      const isUpdated = await fetchService.updateLearner({
        learner: selectedLearner,
      })

      isUpdated
        ? console.log("Updating ... Success!")
        : console.log("Updating failed!")
    }
  }

  function enableEditAndUpdate() {
    setCanEditAndUpdate(!canEditAndUpdate)
  }

  async function onDeleteLearner(e) {
    e.preventDefault()
    console.log("Delete learner id ", selectedLearner.learnerId)
  }

  useEffect(() => {
    async function fetchLearners() {
      const payload = await fetchService.fetchLearners()

      if (payload) {
        //the two operations are not synchronous!
        setLearners(payload)
        setDisplayedLearners(payload)
        setIsFetchSuccess(true)
      } else {
        setIsFetchSuccess(false)
      }
    }
    fetchLearners()
  }, [])

  return (
    <div className="learnerPanelWrapper" style={{ display: "flex" }}>
      <div className="learnerListPanel" style={{ display: "flex" }}>
        <div
          className="searchInputWrapper"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <input
            className="learnerSearchInput"
            value={searchPhrase}
            onChange={onSearchPhraseChanged}
          />
        </div>
        <div className="learnerNameList">
          <LearnerNameList
            learners={displayedLearners}
            onLearnerItemClicked={onLearnerItemClicked}
          />
        </div>
      </div>
      {selectedLearner ? (
        <PersonalBestsForm
          selectedLearner={selectedLearner}
          onPersonalBestsInputChange={onPersonalBestsInputChange}
          onUpdatePersonalBests={onUpdatePersonalBests}
          canEditAndUpdate={canEditAndUpdate}
          enableEditAndUpdate={enableEditAndUpdate}
          onDeleteLearner={onDeleteLearner}
        />
      ) : (
        <FetchLearnersNotificationDiv isFetchSuccess={isFetchSuccess} />
      )}
    </div>
  )
}
