import React from "react"

export function LearnerNameList({ learners, onLearnerItemClicked }) {
  const learnerItems = learners.map(({ learnerId, firstName, lastName }) => {
    return (
      <li
        className="learner-name"
        key={learnerId} //this cannot be retrieved from getAttribute! need to be spelled lowercase
        learnerid={learnerId}
        onClick={onLearnerItemClicked}
      >{`${firstName} ${lastName}`}</li>
    )
  })

  return <ul>{learnerItems}</ul>
}
