import React from "react"
import { Grid, Select, MenuItem } from "@material-ui/core"
import { quickStyles } from "../../../services/register"
//group by rep

export function FilterPanel({ value, onChange, items }) {
  const classes = quickStyles({
    select: {
      minWidth: "2rem",
    },
    wrapper: {
      margin: "1rem 0",
    },
  })
  return (
    <Grid item container justify="space-around" className={classes.wrapper}>
      <Select
        value={value}
        onChange={onChange}
        classes={{ select: classes.select }}
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
