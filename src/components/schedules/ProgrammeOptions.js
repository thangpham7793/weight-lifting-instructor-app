import React from "react"
import {
  FormControlLabel,
  FormGroup,
  FormLabel,
  FormControl,
  Checkbox,
} from "@material-ui/core"

export function ProgrammeOptions({ programmes, onProgrammeChecked }) {
  const checkboxes = programmes.map(({ programmeName, programmeId }) => {
    return (
      <FormControlLabel
        key={programmeId}
        control={
          <Checkbox
            onChange={onProgrammeChecked}
            name={programmeName}
            value={programmeId}
            color="primary"
          />
        }
        label={programmeName}
      />
    )
  })

  return (
    <>
      <FormControl
        component="fieldset"
        style={{ marginBottom: "var(--mg-sm)" }}
      >
        <FormLabel component="legend">Publish to Team: </FormLabel>
        <FormGroup>{checkboxes}</FormGroup>
      </FormControl>
    </>
  )
}
