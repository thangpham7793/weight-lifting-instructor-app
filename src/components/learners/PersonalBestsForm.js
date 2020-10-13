import React from "react"

import { camelCaseToNormal } from "../../utils"

function PersonalBestInput({ label, ...props }) {
  return (
    <div className="pbs-field">
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
  onDeleteLearner,
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
        style={{ opacity: canEditAndUpdate ? "1" : "0.75" }}
      />
    )
  })

  //use modal then
  return (
    <div className="pbs-form-wrapper">
      <h3 style={{ textTransform: "capitalize" }}>
        {selectedLearner.firstName}
      </h3>
      <form readOnly={!canEditAndUpdate} onDoubleClick={enableEditAndUpdate}>
        {inputs}
      </form>
      <div className="pbs-form-btn-wrapper">
        <button className="pbs-btn" onClick={enableEditAndUpdate}>
          {!canEditAndUpdate ? "Enable Edit" : "Disable Edit"}
        </button>
        <button
          className="pbs-btn"
          onClick={onUpdatePersonalBests}
          disabled={!canEditAndUpdate}
        >
          {!canEditAndUpdate ? "Edit" : "Save"}
        </button>
        <button
          className="pbs-btn"
          onClick={onDeleteLearner}
          disabled={!canEditAndUpdate}
        >
          Delete
        </button>
      </div>
    </div>
  )
}
