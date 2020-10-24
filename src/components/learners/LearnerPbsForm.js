import React from "react"
import { Save, Close } from "@material-ui/icons"
import { camelCaseToNormal } from "../../utils"
import { TextField, Grid, Button, InputAdornment } from "@material-ui/core"
import { validateNewPb } from "../../services/register"
import { quickStyles } from "../../services/register"

function PersonalBestInput({ label, ...props }) {
  return (
    <Grid item style={{ marginBottom: "0.5rem" }}>
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
        error={!validateNewPb(pbs[fieldName])}
        helperText={!validateNewPb(pbs[fieldName]) && "Must be 0 or bigger"}
        onChange={onPersonalBestsInputChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
        }}
      />
    )
  })

  const classes = quickStyles({
    btn: {
      width: "40%",
      margin: "1rem auto",
      background: "var(--txt-cl)",
      display: "flex",
      fontSize: "0.5rem",
      justifyContent: "space-around",
    },
  })

  //use modal then
  return (
    <>
      <Grid
        item
        xs={10}
        sm={8}
        md={6}
        lg={4}
        style={{ margin: "0 auto 0.5rem" }}
      >
        <h3 style={{ textTransform: "capitalize", textAlign: "center" }}>
          Personal Bests
        </h3>
      </Grid>
      <form>
        <Grid
          container
          item
          direction="column"
          justify="space-around"
          align="center"
          wrap="nowrap"
          style={{ height: "90vh", margin: "0 auto" }}
          xs={10}
          sm={8}
          md={6}
          lg={4}
        >
          {inputs}
        </Grid>
      </form>
      <Grid
        item
        container
        style={{ justifyContent: "center", margin: "0 auto" }}
        xs={10}
        sm={8}
        md={6}
        lg={4}
      >
        <Button
          onClick={onDialogCloseClicked}
          className={classes.btn}
          variant="contained"
          name="Close"
        >
          <Close className="pbs-btn-icon" />
          {"Close"}
        </Button>
        <Button
          onClick={onDialogCloseClicked}
          className={classes.btn}
          variant="contained"
          name="Save"
          disabled={Object.values(pbs).some(
            (pb) => validateNewPb(pb) === false
          )}
        >
          <Save className="pbs-btn-icon" />
          {"Save"}
        </Button>
      </Grid>
    </>
  )
}
