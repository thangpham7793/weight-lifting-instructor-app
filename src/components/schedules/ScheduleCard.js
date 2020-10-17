import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { useActionSnackbar } from "../../hooks/register"
import httpService from "../../services/ProgrammeServiceSingleton"

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
  ListItemIcon,
} from "@material-ui/core"

import { red } from "@material-ui/core/colors"
import { Delete, Edit, Share, Close } from "@material-ui/icons"

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

function getAttribute(e, attr, isNumber = false) {
  return isNumber
    ? parseInt(e.currentTarget.getAttribute(attr))
    : e.currentTarget.getAttribute(attr)
}

export function ScheduleCard({
  onEditScheduleClicked,
  onPublishScheduleClicked,
  onDeleteScheduleClicked,
  createdAt,
  weekCount,
  scheduleName,
  scheduleId,
  programmes,
  onActionSuccess,
}) {
  const classes = useStyles()

  //think of a way to lazy load the hooks!
  const {
    callDecoratedUnpublishService,
    UnpublishSnackbar,
  } = useActionSnackbar("unpublish", httpService.unpublishSchedule)

  async function onUnpublishScheduleClicked(e) {
    const targetProgramme = programmes.find(
      ({ programmeId }) => programmeId === getAttribute(e, "programmeId", true)
    )

    if (
      window.confirm(
        `Are you sure you want to remove cycle ${scheduleName} from team ${targetProgramme.programmeName}`
      )
    ) {
      //FIXME:
      const { ok } = await callDecoratedUnpublishService(
        scheduleId,
        targetProgramme.programmeId
      )
      if (ok) {
        onActionSuccess("unpublish", { scheduleId, targetProgramme })
      }
    }
  }

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
          <List style={{ textAlign: "left" }} className="team-list">
            <Typography variant="subtitle1">
              Currently Used by Team(s):{" "}
            </Typography>
            {programmes.map((p) => (
              <ListItem
                button
                key={p.programmeId}
                onClick={onUnpublishScheduleClicked}
                programmeid={p.programmeId}
                scheduleid={scheduleId}
                programmename={p.programmeName}
                className="team-list-item"
              >
                <ListItemText
                  className="team-list-item-text"
                  primary={p.programmeName}
                />
                <ListItemIcon>
                  <Close className="unpublish-schedule-icon" fontSize="small" />
                </ListItemIcon>
              </ListItem>
            ))}
          </List>
        )}
        <UnpublishSnackbar />
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
