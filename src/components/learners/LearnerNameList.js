import React from "react"
import { List, ListItem, ListItemText } from "@material-ui/core"

export function LearnerNameList({ learners, onLearnerItemClicked }) {
  const learnerItems = learners.map(({ learnerId, firstName, lastName }) => {
    return (
      <ListItem
        button
        key={learnerId} //this cannot be retrieved from getAttribute! need to be spelled lowercase
        learnerid={learnerId}
        onClick={onLearnerItemClicked}
      >
        <ListItemText primary={`${firstName} ${lastName}`} />
      </ListItem>
    )
  })

  return (
    <List>
      {learners.length === 0 ? (
        <ListItem button>No Learner Found!</ListItem>
      ) : (
        learnerItems
      )}
    </List>
  )
}
