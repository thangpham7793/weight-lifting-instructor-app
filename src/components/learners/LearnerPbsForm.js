import React from "react"
import { Save } from "@material-ui/icons"
import { camelCaseToNormal } from "../../utils"
import { TextField, Grid } from "@material-ui/core"

function PersonalBestInput({ label, ...props }) {
  return (
    <Grid item>
      <TextField
        label={camelCaseToNormal(label)}
        className="text-input"
        {...props}
      />
    </Grid>
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
      <form>
        <Grid
          container
          direction="column"
          justify="space-around"
          style={{ height: "80vh" }}
        >
          {inputs}
        </Grid>
      </form>
      <div
        className="pbs-form-btn-wrapper"
        style={{ justifyContent: "center" }}
      >
        <button className="pbs-btn" onClick={onDialogCloseClicked}>
          <Save className="pbs-btn-icon" />
          {"Save"}
        </button>
      </div>
    </div>
  )
}
