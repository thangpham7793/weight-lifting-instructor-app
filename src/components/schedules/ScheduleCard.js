import React from "react"
import { makeStyles } from "@material-ui/core/styles"

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Avatar,
  Typography,
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

export default function ScheduleCard({
  onEditScheduleClicked,
  onPublishScheduleClicked,
  onDeleteScheduleClicked,
  createdAt,
  scheduleName,
}) {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardHeader
        title="October Peaking Cycle"
        subheader="September 14, 2016" //TODO: should a created_at field be added?
      />
      <CardContent>
        <Typography variant="body2" component="p">
          What should be put in here?
        </Typography>
      </CardContent>
      {/* edit/delete/publish maybe edit should take to a new page */}
      <CardActions disableSpacing className={classes.actionBtnWrapper}>
        <IconButton
          className={classes.scheduleActionBtn}
          aria-label="edit"
          onClick={onEditScheduleClicked}
        >
          <Edit />
        </IconButton>
        <IconButton
          className={classes.scheduleActionBtn}
          aria-label="publish"
          onClick={onPublishScheduleClicked}
        >
          <Share />
        </IconButton>
        <IconButton
          className={classes.scheduleActionBtn}
          aria-label="delete"
          onClick={onDeleteScheduleClicked}
        >
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  )
}
