import React, { useState } from "react"
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core"
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
    width: "70vw",
  },
  navList: {
    paddingTop: 0,
  },
  navItem: {
    "& :hover": {
      color: "var(--txt-cl)",
    },
    "& :focus": {
      color: "var(--txt-cl)",
    },
  },
  navItemText: {
    fontSize: "0.75rem",
  },
}))

export function DrawerLinks({ links, onLogOut }) {
  const [open, setOpen] = useState(false)

  function toggleDrawer(state) {
    setOpen(state)
  }

  const classes = useStyles()

  const navLinks = links
    .filter(({ display }) => display === true)
    .map(({ to, label, icon }) => {
      const Icon = icon
      return to !== "/logout" ? (
        <React.Fragment key={to}>
          {" "}
          <Divider />
          <ListItem
            button
            component={Link}
            to={to}
            onClick={() => toggleDrawer(false)}
            className={classes.navItem}
          >
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText
              primary={label}
              classes={{ primary: classes.navItemText }}
            />
          </ListItem>
        </React.Fragment>
      ) : (
        //basically need to make a fake link here!
        <React.Fragment key={to}>
          <Divider />
          <ListItem button className={classes.navItem}>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText
              primary={label}
              onClick={onLogOut}
              classes={{ primary: classes.navItemText }}
            />
          </ListItem>
          <Divider />
        </React.Fragment>
      )
    })

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
        <List className={classes.navList}>{navLinks}</List>
      </Drawer>
    </>
  )
}
