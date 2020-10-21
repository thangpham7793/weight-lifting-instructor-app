import React, { useState } from "react"
import { Drawer, IconButton, Divider } from "@material-ui/core"
import { Menu } from "@material-ui/icons"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"

const useStyles = makeStyles(() => ({
  btn: {
    padding: "0 0.25rem",
    color: "var(--txt-cl)",
    boxShadow: "none",
    borderRadius: "0",
    flex: "0",
    border: "none",
  },
  drawer: {
    width: "max-content",
  },
  drawerPaper: {
    background: "var(--secondary-cl)",
    width: "50vw",
  },
}))

export function DrawerLinks({ links, onLogOut }) {
  const [open, setOpen] = useState(false)

  function toggleDrawer(state) {
    setOpen(state)
  }

  const navLinks = links
    .filter(({ display }) => display === true)
    .map(({ to, label }) => {
      return to !== "/logout" ? (
        <React.Fragment key={to}>
          <Divider />
          <Link
            to={to}
            className="nav-item"
            onClick={() => toggleDrawer(false)}
          >
            {label}
          </Link>
        </React.Fragment>
      ) : (
        //basically need to make a fake link here!
        <React.Fragment key={to}>
          <Divider />
          <span className="nav-item" label={label} onClick={onLogOut}>
            {label}
          </span>
        </React.Fragment>
      )
    })

  const classes = useStyles()

  return (
    <>
      <IconButton className={classes.btn} onClick={() => toggleDrawer(true)}>
        <Menu />
      </IconButton>
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={open}
        onClose={() => toggleDrawer(false)}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {navLinks}
      </Drawer>
    </>
  )
}
