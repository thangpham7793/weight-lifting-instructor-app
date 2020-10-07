import React, { useState, useEffect } from "react"

import { LearnerNameList, PBForm } from "./register"

export function LearnersPanel() {
  const [learners, setLearners] = useState([])
  const [displayedLearners, setDisplayedLearners] = useState([])
  const [searchPhrase, setSearchPhrase] = useState("")
  const [selectedLearner, setSelectedLearner] = useState({})

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
    //it still works if it's camelCase here
    console.log(getLearnerById(e.target.getAttribute("learnerId")))
    setSelectedLearner(getLearnerById(e.target.getAttribute("learnerId")))
  }

  function updateLearnerPbs(e) {
    console.log("Updating learner pbs!")
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
    <div className="leanerPanelWrapper">
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
      <div className="personalBestsPanel">
        <PBForm
          selectedLearner={selectedLearner}
          updateLearnerPbs={updateLearnerPbs}
        />
      </div>
    </div>
  )
}
