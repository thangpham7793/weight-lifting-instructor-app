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

  function filterLearners(learners, phrase) {
    const processedPhrase = phrase.trim().toLowerCase()

    if (processedPhrase.length === 0) return learners

    return learners.filter(
      ({ firstName, lastName }) =>
        firstName.toLowerCase().trim().startsWith(processedPhrase) ||
        lastName.toLowerCase().trim().startsWith(processedPhrase)
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
    setDisplayedLearners(filterLearners(learners, phrase))
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
    const newValue = e.target.value

    //console.log(e.target.getAttribute("name"))

    setSelectedLearner((selectedLearner) => {
      let newSelectedLearner = { ...selectedLearner }
      newSelectedLearner[changedField] = newValue
      return newSelectedLearner
    })
  }

  //FIXME: this may break if user's currently filtering!
  function updateUILearnerList(updatedLearnerIndex, action = "UPDATE") {
    const newLearnersList = [...learners]
    switch (action) {
      default:
        newLearnersList[updatedLearnerIndex] = selectedLearner
        //updated the list because name can be updated
        setLearners(newLearnersList)
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
        //reset searchPhrase
        setSearchPhrase("")
        break
    }
  }

  function getUpdatedLearnerIndex(learners, selectedLearner) {
    return learners.findIndex(
      ({ learnerId }) => learnerId === selectedLearner.learnerId
    )
  }

  async function onUpdatePersonalBests(e) {
    //disable submission
    e.preventDefault()

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

      console.log(`Sending ${JSON.stringify(selectedLearner)}`)

      // const isUpdated = await fetchService.updateLearner({
      //   learner: selectedLearner,
      // })
      const isUpdated = false

      if (isUpdated) {
        //...when should you update?
        updateUILearnerList(updatedLearnerIndex)
      } else {
        console.log("Updating failed!")
        //refill the form with the old information
        setSelectedLearner(learners[updatedLearnerIndex])
        setSearchPhrase(selectedLearner.firstName)
      }
    }
  }

  function enableEditAndUpdate() {
    setCanEditAndUpdate(!canEditAndUpdate)
  }

  async function onDeleteLearner(e) {
    e.preventDefault()

    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedLearner.firstName}'s record?`
      )
    ) {
      setCanEditAndUpdate(false)
      return
    }

    console.log("Delete learner id ", selectedLearner.learnerId)

    // const isDeleted = await fetchService.deleteLearner(
    //   selectedLearner.learnerId
    // )

    const isDeleted = true

    if (isDeleted) {
      const updatedLearnerIndex = getUpdatedLearnerIndex(
        learners,
        selectedLearner
      )
      updateUILearnerList(updatedLearnerIndex, "DELETE")
      console.log("Deleting ... Success!")
    } else {
      console.log("Deleting failed!")
    }
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
            placeholder="Type to Filter"
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
