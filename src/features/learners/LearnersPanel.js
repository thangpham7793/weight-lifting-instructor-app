import React, { useState, useEffect } from "react"

import { LearnerNameList, PersonalBestsForm } from "./register"

function PBFormPanel({ pbForm }) {
  return (
    <div className="personalBestsPanel">
      {pbForm ? pbForm : <div>Click on A Name</div>}
    </div>
  )
}

export function LearnersPanel() {
  const [learners, setLearners] = useState([])
  const [displayedLearners, setDisplayedLearners] = useState([])
  const [searchPhrase, setSearchPhrase] = useState("")
  const [selectedLearner, setSelectedLearner] = useState(null)

  //should make my own form... (and when a new learner is selected use that as the stored values)

  //FIXME: not starts with
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

    console.log(e.target.getAttribute("name"))

    setSelectedLearner((selectedLearner) => {
      let newSelectedLearner = { ...selectedLearner }
      newSelectedLearner[changedField] = newValue
      return newSelectedLearner
    })
  }

  function onUpdatePersonalBests(e) {
    e.preventDefault()
    console.log(selectedLearner)

    const newLearnersList = [...learners]

    const updatedLearnerIndex = learners.findIndex(
      ({ learnerId }) => learnerId === selectedLearner.learnerId
    )
    newLearnersList[updatedLearnerIndex] = selectedLearner

    setDisplayedLearners(newLearnersList)
    setLearners(newLearnersList)
  }

  useEffect(() => {
    async function fetchLearners() {
      const response = await fetch("http://localhost:5000/learners")
      const payload = await response.json()

      //the two operations are not synchronous!
      setLearners(payload)
      setDisplayedLearners(payload)
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
        />
      ) : (
        <div>Click On A Name</div>
      )}
    </div>
  )
}
