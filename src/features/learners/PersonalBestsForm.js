import React from "react"

import { camelCaseToNormal } from "../../utils"

function PersonalBestInput({ label, ...props }) {
  return (
    <div>
      <label htmlFor={props.id || props.name}>{camelCaseToNormal(label)}</label>
      <input className="text-input" {...props} />
    </div>
  )
}

export function PersonalBestsForm({
  selectedLearner = {},
  onPersonalBestsInputChange,
  onUpdatePersonalBests,
  enableEditAndUpdate,
  canEditAndUpdate,
}) {
  //it does changes, but doesn't show on the UI
  const inputs = Object.keys(selectedLearner).map((fieldName) => {
    if (fieldName === "learnerId") return null
    return (
      <PersonalBestInput
        label={fieldName}
        name={fieldName}
        type="text"
        key={fieldName}
        value={selectedLearner[fieldName]}
        onChange={onPersonalBestsInputChange}
        readOnly={!canEditAndUpdate}
      />
    )
  })

  //it does get called, it's just that ... the initial values aren't reset?
  console.log("I was re-rendered!")
  //use modal then
  return (
    <>
      <h3>Personal Bests</h3>
      <form onSubmit={onUpdatePersonalBests} readOnly={!canEditAndUpdate}>
        {inputs}
        <button type="submit" onClick={enableEditAndUpdate}>
          {!canEditAndUpdate ? "Edit" : "Save"}
        </button>
      </form>
    </>
  )
}
