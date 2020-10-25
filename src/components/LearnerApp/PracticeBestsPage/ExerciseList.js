import React from "react"
import { List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core"
import { FitnessCenter, SentimentDissatisfied } from "@material-ui/icons"

export function ExerciseList({ exerciseNames, onExerciseClicked }) {
  const exerciseList = exerciseNames.map((name) => {
    return (
      <ListItem
        button
        key={name}
        id={name}
        onClick={onExerciseClicked}
        divider
        className="exercise-list-item"
      >
        <ListItemIcon>
          {name === "no exercise found" ? (
            <SentimentDissatisfied />
          ) : (
            <FitnessCenter />
          )}
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItem>
    )
  })

  return <List style={{ minWidth: "95vw" }}>{exerciseList}</List>
}
