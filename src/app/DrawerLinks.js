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
import { NavLink } from "react-router-dom"
import { quickStyles } from "../services/register"

export function DrawerLinks({ links, onLogOut, navBarHeight }) {
  const classes = quickStyles({
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
      marginTop: navBarHeight ? `${parseInt(navBarHeight) + 20}px` : "3.5rem",
    },
    navItem: {
      "& :hover": {
        color: "var(--txt-cl)",
        fontWeight: "600",
      },
      "& :focus": {
        color: "var(--txt-cl)",
        fontWeight: "600",
      },
    },
    navItemText: {
      fontSize: "0.75rem",
      fontWeight: "inherit",
    },
  })

  const [open, setOpen] = useState(false)

  function toggleDrawer(state) {
    setOpen(state)
  }

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
            component={NavLink}
            to={to}
            onClick={() => toggleDrawer(false)}
            className={classes.navItem}
            classes={{ root: classes.navItem }}
            activeStyle={{
              fontWeight: "600",
              color: "var(--txt-cl)",
              pointerEvents: "none",
              cursor: "default",
            }}
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
          <ListItem button className={classes.navItem} id="sidebar-logout-link">
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
      <IconButton className={classes.btn} onClick={() => toggleDrawer(!open)}>
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
        id="sidebar-drawer"
      >
        <List className={classes.navList}>{navLinks}</List>
      </Drawer>
    </>
  )
}
