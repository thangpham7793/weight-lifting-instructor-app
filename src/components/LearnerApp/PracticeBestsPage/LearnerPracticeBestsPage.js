import React, { useState } from "react"
import { Grid, TextField, InputAdornment } from "@material-ui/core"
import { Search } from "@material-ui/icons"
import { exerciseNames } from "./exerciseNames"
import { ExerciseList } from "./ExerciseList"
import { quickStyles } from "../../../services/register"

export function LearnerPracticeBestsPage() {
  const classes = quickStyles({
    wrapper: { paddingTop: "0.5rem" },
    icon: { color: "#315c4d" },
    listWrapper: {
      maxHeight: "80vh",
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
    return exerciseNames.filter((name) => regex.test(name))
  }

  function onSearchPhraseChanged(e) {
    setSearchPhrase(e.currentTarget.value)
    setDisplayedExerciseNames(filterExerciseNames(e.currentTarget.value))
  }

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
          value={searchPhrase}
          onChange={onSearchPhraseChanged}
        />
      </Grid>
      <Grid item container justify="center" className={classes.listWrapper}>
        <ExerciseList exerciseNames={displayedExerciseNames} />
      </Grid>
    </Grid>
  )
}
