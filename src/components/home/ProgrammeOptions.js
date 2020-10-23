import React from "react"
import { Select, MenuItem, InputLabel, Grid } from "@material-ui/core"

export function ProgrammeOptions({ programmes, label, ...props }) {
  const items = programmes.map((i) => {
    return (
      <MenuItem value={i.programmeId} key={i.programmeId}>
        {i.programmeName}
      </MenuItem>
    )
  })

  return (
    <Grid item align="left" style={{ marginTop: "1rem" }}>
      <InputLabel>{label}</InputLabel>
      <Select {...props}>{items}</Select>
    </Grid>
  )
}
