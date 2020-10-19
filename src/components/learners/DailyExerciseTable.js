import React from "react"
import { camelCaseToNormal } from "../../utils"
import { processInstruction } from "../../services/register"
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
} from "@material-ui/core"

export function DailyExerciseTable({ dailyExercises, pbs }) {
  return (
    <TableContainer>
      <Table
        className="learner-table"
        size="small"
        aria-label="learner-exercise -table"
      >
        <TableHead>
          <TableRow>
            {Object.keys(dailyExercises[0]).map((k) => {
              return (
                <TableCell className="learner-table-cell head" align="center">
                  {camelCaseToNormal(k)}
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {dailyExercises.map((e) => (
            <TableRow className="timetable-row">
              <TableCell className="learner-table-cell" align="center">
                {e.exerciseName}
              </TableCell>
              <TableCell className="learner-table-cell" align="center">
                {processInstruction(e, pbs)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
