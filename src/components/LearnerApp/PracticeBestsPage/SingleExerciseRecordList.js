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

export default function SingleExerciseRecordList({ records, onEditClicked }) {
  const classes = quickStyles({
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
  })

  let items

  function formatRecordString(repMax, weight, lastEdited) {
    return `${repMax} | ${weight} Kg | ${lastEdited}`
  }

  if (records.length === 0) {
    items = (
      <ListItem divider>
        <ListItemIcon>
          <SentimentDissatisfied />
        </ListItemIcon>
        <ListItemText listItemTextPrimary="No Available Records Found!" />
      </ListItem>
    )
  } else {
    items = records.map(({ pbId, repMax, weight, lastEdited }) => {
      return (
        <ListItem button divider key={pbId} className="practice-best-list-item">
          <ListItemText
            classes={{ primary: classes.listItemTextPrimary }}
            primary={formatRecordString(repMax, weight, lastEdited)}
          />
          <IconButton
            classes={{ root: classes.iconBtn }}
            className="practice-best-btn-icon"
            pbid={pbId}
            onClick={onEditClicked}
          >
            <Edit fontSize="small" />
          </IconButton>
        </ListItem>
      )
    })
  }

  return <List>{items}</List>
}
