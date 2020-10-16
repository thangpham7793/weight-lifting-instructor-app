import React from "react"
import {
  FormControlLabel,
  FormGroup,
  FormLabel,
  FormControl,
  Checkbox,
  Typography,
} from "@material-ui/core"

export function ProgrammeOptions({ programmes, onProgrammeChecked, label }) {
  let content
  if (programmes.length > 0) {
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
    content = (
      <>
        <FormLabel component="legend">{label}</FormLabel>
        <FormGroup>{checkboxes}</FormGroup>
      </>
    )
  } else {
    content = <Typography component="p">No Programme Available</Typography>
  }

  return (
    <FormControl component="fieldset" style={{ marginBottom: "var(--mg-sm)" }}>
      {content}
    </FormControl>
  )
}
