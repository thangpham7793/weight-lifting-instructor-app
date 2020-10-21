import React from "react"
import { Grid } from "@material-ui/core"
import { DrawerLinks } from "./DrawerLinks"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() => ({
  wrapper: {
    padding: "0 0.25rem",
  },
  title: {
    fontWeight: "var(--fw-lg)",
    fontSize: "calc(0.35 * var(--fs-md))",
  },
}))

export function DrawerNavBar({ pageTitle, links, onLogOut }) {
  const classes = useStyles()

  return (
    <header>
      <Grid container className={classes.wrapper}>
        <Grid item className="navLinks" xs={1}>
          <DrawerLinks links={links} onLogOut={onLogOut} />
        </Grid>
        <Grid item xs={11}>
          <h1 className={classes.title}>{pageTitle}</h1>
        </Grid>
      </Grid>
    </header>
  )
}
