import React, { useCallback } from "react"
import { useHistory } from "react-router-dom"
import { List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core"
import { FitnessCenter } from "@material-ui/icons"

export function ExerciseList({ exerciseNames }) {
  const history = useHistory()

  const navigateToSingleExercisePage = useCallback(
    (e) => {
      const targetExercise = e.currentTarget.getAttribute("id")
      console.log("Clicked!", targetExercise)
      //do you need to encode here?
      history.push(`/practice.bests/${encodeURI(targetExercise)}`)
    },
    [history]
  )

  const exerciseList = exerciseNames.map((name) => {
    return (
      <ListItem
        button
        key={name}
        id={name}
        onClick={navigateToSingleExercisePage}
      >
        <ListItemIcon>
          <FitnessCenter />
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItem>
    )
  })

  return <List>{exerciseList}</List>
}
