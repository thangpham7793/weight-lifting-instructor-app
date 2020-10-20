import React from "react"
import { Save } from "@material-ui/icons"
import { camelCaseToNormal } from "../../utils"

function PersonalBestInput({ label, ...props }) {
  return (
    <div className="pbs-field">
      <label htmlFor={props.id || props.name}>{camelCaseToNormal(label)}</label>
      <input className="text-input" {...props} />
    </div>
  )
}

//for learnerApp
export function LearnerPbsForm({
  pbs,
  onPersonalBestsInputChange,
  onUpdatePersonalBests,
  onDialogCloseClicked,
}) {
  //it does changes, but doesn't show on the UI
  const inputs = Object.keys(pbs).map((fieldName) => {
    if (fieldName === "learnerId") return null
    return (
      <PersonalBestInput
        label={fieldName}
        name={fieldName}
        type="text"
        key={fieldName}
        value={pbs[fieldName]}
        onChange={onPersonalBestsInputChange}
      />
    )
  })

  //use modal then
  return (
    <div className="pbs-form-wrapper">
      <h3 style={{ textTransform: "capitalize" }}>Personal Bests</h3>
      <form>{inputs}</form>
      <div className="pbs-form-btn-wrapper">
        <button className="pbs-btn" onClick={onDialogCloseClicked}>
          <Save className="pbs-btn-icon" />
          {"Save & Close"}
        </button>
      </div>
    </div>
  )
}
