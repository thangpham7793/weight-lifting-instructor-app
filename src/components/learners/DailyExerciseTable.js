import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { camelCaseToNormal } from "../../utils"
import { processInstruction } from "../../services/register"
import {
  Grid,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
} from "@material-ui/core"

const useStyles = makeStyles({
  table: {
    minWidth: 250,
  },
})

export function DailyExerciseTable({ dailyExercises, pbs }) {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {Object.keys(dailyExercises[0]).map((k) => {
              return (
                <TableCell align="center">{camelCaseToNormal(k)}</TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {dailyExercises.map((e) => (
            <TableRow>
              <TableCell align="center">{e.exerciseName}</TableCell>
              <TableCell align="center">{processInstruction(e, pbs)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
