import React from "react"
import { LearnerNameList } from "./register"
import {
  TextField,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core"

export function LearnerSearchPanel({
  searchPhrase,
  onSearchPhraseChanged,
  learners,
  displayedLearners,
  onLearnerItemClicked,
}) {
  return (
    <Grid
      item
      container
      wrap="nowrap"
      className="learnerListPanel"
      direction="column"
      style={{ width: "30%" }}
    >
      <Grid
        item
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "0.5rem",
        }}
      >
        <TextField
          className="learnerSearchInput"
          value={searchPhrase}
          onChange={onSearchPhraseChanged}
          placeholder={
            learners.length === 0 ? "No Learners Added Yet" : "Type to Filter"
          }
          disabled={learners.length === 0 ? true : false}
        />
      </Grid>
      <Grid item className="learnerNameList">
        {learners.length === 0 ? (
          <List>
            <ListItem button>
              <ListItemText primary="No Learners Added Yet" />
            </ListItem>
          </List>
        ) : (
          <LearnerNameList
            learners={displayedLearners}
            onLearnerItemClicked={onLearnerItemClicked}
          />
        )}
      </Grid>
    </Grid>
  )
}
