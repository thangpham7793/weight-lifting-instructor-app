import React from "react"
import { LearnerNameList } from "./register"

export function LearnerSearchInput({
  searchPhrase,
  onSearchPhraseChanged,
  learners,
  displayedLearners,
  onLearnerItemClicked,
}) {
  return (
    <div className="learnerListPanel" style={{ display: "flex" }}>
      <div
        className="searchInputWrapper"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          className="learnerSearchInput"
          value={searchPhrase}
          onChange={onSearchPhraseChanged}
          placeholder={
            learners.length === 0 ? "Loading Learners ..." : "Type to Filter"
          }
          disabled={learners.length === 0 ? true : false}
        />
      </div>
      <div className="learnerNameList">
        {learners.length === 0 ? (
          <ul>
            <li className="learner-name">Loading Learners ...</li>
          </ul>
        ) : (
          <LearnerNameList
            learners={displayedLearners}
            onLearnerItemClicked={onLearnerItemClicked}
          />
        )}
      </div>
    </div>
  )
}