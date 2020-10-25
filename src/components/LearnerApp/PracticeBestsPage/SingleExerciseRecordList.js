import React from "react"
import { SentimentDissatisfied, Edit } from "@material-ui/icons"
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@material-ui/core"
import { quickStyles } from "../../../services/register"

export default function SingleExerciseRecordList({
  records,
  onEditClicked,
  currentRepMax = "All",
  icon = Edit,
}) {
  const classes = quickStyles({
    list: {
      overflow: "auto",
      maxHeight: "65vh",
    },
    listItemTextPrimary: {
      fontSize: "0.85rem",
      color: "#333",
      textAlign: "center",
      fontWeight: "600",
    },
    iconBtn: {
      justifyContent: "center",
      marginLeft: "0.25rem",
      padding: "0.5rem",
      color: "var(--txt-cl)",
      boxShadow: "none",
      borderRadius: "50%",
      flex: "0",
      border: "none",
      "& :hover": {
        color: "#111",
      },
    },
    icon: {
      justifyContent: "center",
    },
  })

  const Icon = icon
  let items

  if (records.length === 0) {
    items = (
      <ListItem divider className="practice-best-list-item">
        <ListItemIcon className={classes.icon}>
          <SentimentDissatisfied />
        </ListItemIcon>
        <ListItemText
          primary="No Available Records Found!"
          classes={{ primary: classes.listItemTextPrimary }}
        />
      </ListItem>
    )
  } else {
    items = records.map(({ pbId, repMax, weight, lastEdited }) => {
      return (
        <ListItem button divider key={pbId} className="practice-best-list-item">
          {currentRepMax === "All" && (
            <ListItemText
              classes={{ primary: classes.listItemTextPrimary }}
              primary={repMax}
            />
          )}
          <ListItemText
            classes={{ primary: classes.listItemTextPrimary }}
            primary={`${weight} Kg`}
          />
          <ListItemText
            classes={{ primary: classes.listItemTextPrimary }}
            primary={lastEdited}
          />
          <IconButton
            classes={{ root: classes.iconBtn }}
            className="practice-best-btn-icon"
            pbid={pbId}
            onClick={onEditClicked}
          >
            <Icon fontSize="small" />
          </IconButton>
        </ListItem>
      )
    })
  }

  return <List className={classes.list}>{items}</List>
}
