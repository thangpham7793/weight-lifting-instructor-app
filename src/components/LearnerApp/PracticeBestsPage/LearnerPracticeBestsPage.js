import React, { useState, useCallback } from "react"
import { useHistory } from "react-router-dom"
import { Grid, TextField, InputAdornment } from "@material-ui/core"
import { Search } from "@material-ui/icons"
import { exerciseNames } from "../../../reducers/exerciseNames"
import { ExerciseList } from "./ExerciseList"
import { quickStyles } from "../../../services/register"
import { BackButton } from "./BackButton"

export function LearnerPracticeBestsPage() {
  const classes = quickStyles({
    wrapper: { paddingTop: "0.5rem" },
    searchBar: { padding: "1rem" },
    icon: { color: "#315c4d" },
    listWrapper: {
      maxHeight: "65vh",
      overflow: "auto",
      textTransform: "capitalize",
    },
  })

  const [searchPhrase, setSearchPhrase] = useState("")
  const [displayedExerciseNames, setDisplayedExerciseNames] = useState(
    exerciseNames
  )

  function filterExerciseNames(searchPhrase) {
    const regex = RegExp(searchPhrase, "gi")
    const filteredList = exerciseNames.filter((name) => regex.test(name))
    return filteredList.length > 0 ? filteredList : ["no exercise found"]
  }

  function onSearchPhraseChanged(e) {
    setSearchPhrase(e.currentTarget.value)
    setDisplayedExerciseNames(filterExerciseNames(e.currentTarget.value))
  }

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

  return (
    <Grid
      container
      spacing={3}
      direction="column"
      justify="center"
      align="space-between"
      className={classes.wrapper}
    >
      <Grid item container justify="center">
        <TextField
          placeholder="Search Exercise"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className={classes.icon} />
              </InputAdornment>
            ),
          }}
          className={classes.searchBar}
          value={searchPhrase}
          onChange={onSearchPhraseChanged}
        />
      </Grid>
      <Grid item container justify="center" className={classes.listWrapper}>
        <ExerciseList
          exerciseNames={displayedExerciseNames}
          onExerciseClicked={navigateToSingleExercisePage}
        />
      </Grid>
      <BackButton to="/learner/schedules" label="Back to Schedules" />
    </Grid>
  )
}
