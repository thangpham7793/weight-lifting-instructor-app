import React from "react"
import { makeStyles } from "@material-ui/core/styles"

import {
  Card,
  CardHeader,
  List,
  CardContent,
  CardActions,
  IconButton,
  ListItem,
  Typography,
  ListItemText,
} from "@material-ui/core"

import { red } from "@material-ui/core/colors"
import { Delete, Edit, Share } from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
  root: {
    background: "var(--txt-cl)",
    boxShadow: "var(--bsd-md)",
  },
  media: {},
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  actionBtnWrapper: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  scheduleActionBtn: {
    border: "none",
    boxShadow: "none",
    padding: "var(--pd-sm)",
    width: "max-content",
    "&:hover": {
      color: "var(--secondary-cl)",
      background: "#333",
    },
  },
}))

export function ScheduleCard({
  onEditScheduleClicked,
  onPublishScheduleClicked,
  onDeleteScheduleClicked,
  createdAt,
  weekCount,
  scheduleName,
  scheduleId,
  programmes,
}) {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardHeader
        title={scheduleName ? scheduleName : "Unnamed"}
        subheader={
          weekCount ? `${weekCount} week(s)` : "No Exercises Added Yet"
        } //TODO: should a created_at field be added?
      />
      <CardContent>
        {programmes.length === 0 ? null : (
          <List style={{ textAlign: "left" }}>
            <Typography variant="subtitle1">
              Currently Used by Team(s):{" "}
            </Typography>
            {programmes.map((p) => (
              <ListItem key={p.programmeId}>
                <ListItemText primary={p.programmeName} />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
      <CardActions disableSpacing className={classes.actionBtnWrapper}>
        <IconButton
          className={classes.scheduleActionBtn}
          aria-label="edit"
          onClick={onEditScheduleClicked}
          scheduleid={scheduleId}
        >
          <Edit />
        </IconButton>
        <IconButton
          className={classes.scheduleActionBtn}
          aria-label="publish"
          onClick={onPublishScheduleClicked}
          scheduleid={scheduleId}
        >
          <Share />
        </IconButton>
        <IconButton
          className={classes.scheduleActionBtn}
          aria-label="delete"
          onClick={onDeleteScheduleClicked}
          scheduleid={scheduleId}
        >
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  )
}
