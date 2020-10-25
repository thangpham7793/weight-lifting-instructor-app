import React from "react"
import { Grid, Typography } from "@material-ui/core"
import { quickStyles } from "../../services/register"

export function HistoricalPersonalBestsList({ pbsList, title, selectMenu }) {
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

  const SelectMenu = selectMenu
  const PbsList = pbsList
  //use modal then
  return (
    <Grid item style={{ width: "35%", overflow: "auto", maxHeight: "80vh" }}>
      <Typography variant="h6" className={classes.title}>
        {title}
      </Typography>
      <SelectMenu />
      <PbsList />
    </Grid>
  )
}
