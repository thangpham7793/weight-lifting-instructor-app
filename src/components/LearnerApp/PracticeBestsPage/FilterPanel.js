import React from "react"
import { Grid, Select, MenuItem } from "@material-ui/core"
//group by rep

export function FilterPanel({ value, onChange, items }) {
  return (
    <Grid item container justify="space-around">
      <Select
        value={value}
        onChange={onChange}
        style={{ paddingRight: "2rem" }}
      >
        {items.map((i) => {
          return (
            <MenuItem value={i} key={i}>
              {i}
            </MenuItem>
          )
        })}
      </Select>
    </Grid>
  )
}
