import React from "react"
import { Edit, Delete, Save } from "@material-ui/icons"
import {
  Button,
  TextField,
  Grid,
  InputAdornment,
  Typography,
} from "@material-ui/core"
import { camelCaseToNormal } from "../../utils"
import { quickStyles } from "../../services/register"

function PersonalBestInput({ label, ...props }) {
  return (
    <TextField
      label={camelCaseToNormal(label)}
      className="text-input"
      {...props}
    />
  )
}

export function PersonalBestsForm({
  selectedLearner = {},
  onPersonalBestsInputChange,
  onUpdatePersonalBests,
  enableEditAndUpdate,
  canEditAndUpdate,
  onDeleteLearner,
  title,
}) {
  const classes = quickStyles({
    btn: {
      fontSize: "0.75rem",
      width: "max-content",
    },
    btnLabel: {
      fontSize: "0.5rem",
    },
    input: {
      fontWeight: "var(--fw-md)",
      marginBottom: "0.5rem",
      minWidth: "max-content",
      fontSize: "0.75rem",
    },
    title: {
      textTransform: "capitalize",
      textAlign: "center",
      fontSize: "1rem",
      marginBottom: "0.5rem",
    },
  })

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
        disabled={!canEditAndUpdate}
        className={classes.input}
        InputProps={{
          endAdornment: ![
            "username",
            "email",
            "firstName",
            "lastName",
          ].includes(fieldName) && (
            <InputAdornment position="end">Kg</InputAdornment>
          ),
        }}
      />
    )
  })

  //use modal then
  return (
    <Grid item style={{ width: "35%", overflow: "auto", maxHeight: "80vh" }}>
      <Typography variant="h6" className={classes.title}>
        {title}
        <Typography />
      </Typography>
      <form readOnly={!canEditAndUpdate} onDoubleClick={enableEditAndUpdate}>
        <Grid container wrap="nowrap" direction="column" justify="center">
          {inputs}
        </Grid>
      </form>
      <div className="pbs-form-btn-wrapper">
        <Button
          onClick={enableEditAndUpdate}
          className={classes.btn}
          classes={{ label: classes.btnLabel }}
        >
          <Edit className="pbs-btn-icon" />
          {!canEditAndUpdate ? "Enable Edit " : "Disable Edit "}
        </Button>
        <Button
          onClick={onUpdatePersonalBests}
          disabled={!canEditAndUpdate}
          className={classes.btn}
          classes={{ label: classes.btnLabel }}
        >
          <Save className="pbs-btn-icon" />
          {"Save "}
        </Button>
        <Button
          onClick={onDeleteLearner}
          disabled={!canEditAndUpdate}
          className={classes.btn}
          classes={{ label: classes.btnLabel }}
        >
          <Delete className="pbs-btn-icon" />
          {"Delete "}
        </Button>
      </div>
    </Grid>
  )
}
